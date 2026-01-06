import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

type ChartType = 'corpDist' | 'ratioHeatmap' | 'ratioScatter' | 'changeDist';
type FY = 'LTM-0' | 'LTM-1' | 'LTM-2' | 'LTM-3';
type Exchange =
  | 'all'
  | 'usa_all'
  | 'nye'
  | 'nasdaq'
  | 'kor_all'
  | 'krx'
  | 'kospi'
  | 'kosdaq';
type Level = 'default' | 'sector' | 'industry';

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const chartType = sp.get('chartType') as ChartType | 'corpDist';
  const fy = sp.get('fy') as FY | 'LTM-0';
  const exchange = sp.get('exchange') as Exchange | 'nasdaq';
  const level = sp.get('level') as Level | 'default';
  const parentId = sp.get('parentId') as Level | '';

  // selector params
  const metric = sp.get('metric');
  const agg = sp.get('agg') ?? 'none';
  const basis = sp.get('basis') ?? 'none';

  // file name
  let fileName = '';
  if (chartType === 'corpDist' || chartType === 'changeDist') {
    fileName = `${metric}_none_none.json`;
  } else if (chartType === 'ratioHeatmap' || chartType === 'ratioScatter') {
    if (!agg || !basis) {
      return NextResponse.json(
        { error: 'agg and basis are required for ratioHeatmap' },
        { status: 400 }
      );
    }
    fileName = `${metric}_${agg}_${basis}.json`;
  } else {
    return NextResponse.json({ error: 'Invalid chartType' }, { status: 400 });
  }

  // changeDist는 fy가 LTM-0만 유효(정책)
  if (chartType === 'changeDist' && fy !== 'LTM-0') {
    return NextResponse.json(
      { error: 'changeDist supports only fy=LTM-0' },
      { status: 400 }
    );
  }

  const isUSExchange = ['usa_all', 'nye', 'nasdaq'].includes(exchange);
  const pathData = isUSExchange ? 'data/us' : 'data';

  // public/data/analysis/... 를 읽는다고 가정
  // 미국의 경우 public/data/us/analysis...
  let filePath = parentId
    ? path.join(
        process.cwd(),
        'public',
        pathData,
        'analysis',
        chartType,
        fy,
        exchange,
        level,
        parentId,
        fileName
      )
    : path.join(
        process.cwd(),
        'public',
        pathData,
        'analysis',
        chartType,
        fy,
        exchange,
        level,
        fileName
      );

  if (chartType === 'ratioScatter') {
    filePath = filePath.replace('Scatter', 'Heatmap');
  }

  try {
    const jsonText = await fs.readFile(filePath, 'utf-8');
    const payload = JSON.parse(jsonText);

    if (chartType === 'ratioScatter') {
      payload.meta.chartType = 'ratioScatter';
    }

    // 캐시 정책: 데이터는 "배치 생성"이므로 강하게 캐시 가능
    // s-maxage: CDN 캐시, stale-while-revalidate: 백그라운드 재검증
    const res = NextResponse.json(payload, { status: 200 });
    res.headers.set(
      'Cache-Control',
      'public, max-age=60, s-maxage=86400, stale-while-revalidate=86400'
    );
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (e: any) {
    // 파일 없으면 404
    return NextResponse.json({ error: 'Not found', filePath }, { status: 404 });
  }
}
