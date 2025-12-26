import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const fy = sp.get('fy') || 'LTM-0';
  const exchange = sp.get('exchange') || 'kospi';
  const emsecIdParam = sp.get('emsecId'); // 없을 수 있음
  const emsecId = emsecIdParam ? Number(emsecIdParam) : null;
  // const chartType = sp.get('chartType') || 'corpDist';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { fiscalYear: fy, stockExchange: exchange };

  // 0) 선택 없음 → sector만 반환
  if (!emsecId || Number.isNaN(emsecId)) {
    where.level = 'sector';
    const data = await prisma.industryAggregates.findMany({
      where,
      orderBy: [{ id: 'asc' }],
    });
    return NextResponse.json(data);
  }

  // 1) 선택된 emsec 노드의 level 조회 (핵심)
  const node = await prisma.emsec.findUnique({
    where: { id: emsecId },
    select: { id: true, level: true, sectorId: true, industryId: true },
  });

  if (!node) {
    where.level = 'sector';
    const data = await prisma.industryAggregates.findMany({
      where,
      orderBy: [{ id: 'asc' }],
    });
    return NextResponse.json(data);
  }

  // 2) 레벨 기반 서버 필터 정책
  if (node.level === 'sector') {
    where.level = 'industry';
    where.sectorId = node.sectorId;
    const data = await prisma.industryAggregates.findMany({
      where,
      orderBy: [{ id: 'asc' }],
    });
    return NextResponse.json(data);
  }

  // industry 선택 시: 해당 sectorId의 industry 레벨만 보여주기 (industry 비교용)
  if (node.level === 'industry') {
    where.level = 'sub_industry';
    where.industryId = node.industryId;
    if (node.sectorId) {
      where.sectorId = node.sectorId;
    }
    const data = await prisma.industryAggregates.findMany({
      where,
      orderBy: [{ id: 'asc' }],
    });
    return NextResponse.json(data);
  }
}
