import { loadAnalysisJson } from '@/lib/analysis-store';
import { NextRequest, NextResponse } from 'next/server';

type Level = 'all' | 'sector' | 'industry';

function normalizeExchange(ex: string) {
  // 당신의 exchange taxonomy에 맞춰 정규화
  // e.g. 'usa_all' -> 'usa', 'kor_all' -> 'krx' 등
  return ex;
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const fy = sp.get('fy') ?? 'LTM-0';
  const exchange = normalizeExchange(sp.get('exchange') ?? 'kospi');
  const chartType = sp.get('chartType') ?? 'ratio';

  const selectedEmsecId = sp.get('emsecId'); // optional
  const selectedLevel = (sp.get('level') as Level | null) ?? null;

  const var1 = sp.get('var1') ?? '';
  const var2 = sp.get('var2') ?? '';
  const var3 = sp.get('var3') ?? '';

  // B안: sector 선택 시 하위 연동 없음 → sector 데이터만 내려줌
  let level: Level = 'sector';
  if (selectedEmsecId && selectedLevel) {
    if (selectedLevel === 'industry') level = 'industry';
    if (selectedLevel === 'sector') level = 'sector';
  }

  try {
    const payload = await loadAnalysisJson({
      fy,
      exchange,
      chartType,
      level,
      var1,
      var2,
      var3,
    });

    // 여기서 "클라이언트 필터로 처리" 방침이면 그대로 반환.
    // 만약 industry/sub 선택 시 특정 emsecId만 좁히고 싶다면 여기서 rows를 filter하면 됨.

    return NextResponse.json(payload);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to load payload' },
      { status: 500 }
    );
  }
}
