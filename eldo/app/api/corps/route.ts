/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/corps/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// 서버에서 허용할 정렬 필드(“테이블 행” 기준)
const SORT_FIELDS = new Set([
  'corpNameEn',
  'corpTicker',
  'stockExchange',
  'settlePeriod',
  'dateListed',
]);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // pagination
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get('limit') || '20', 10), 1),
      200
    );
    const skip = (page - 1) * limit;

    // search & filters
    const q = (searchParams.get('q') || '').trim();
    const exchanges = searchParams.getAll('exchange').filter(Boolean); // enum string list
    const emsecIds = searchParams
      .getAll('emsec')
      .map((x) => parseInt(x, 10))
      .filter((n) => Number.isFinite(n));

    // sorting
    const sort = searchParams.get('sort') || 'corpNameEn';
    const order =
      (searchParams.get('order') || 'asc') === 'desc' ? 'desc' : 'asc';
    const safeSort = SORT_FIELDS.has(sort) ? sort : 'corpNameEn';

    // base where
    const where: any = {};

    if (q) {
      where.OR = [
        { corpNameLocal: { contains: q, mode: 'insensitive' as const } },
        { corpNameEn: { contains: q, mode: 'insensitive' as const } },
        { corpTicker: { contains: q, mode: 'insensitive' as const } },
      ];
    }

    if (exchanges.length) {
      where.stockExchange = { in: exchanges as any };
    }

    // Sector/Industry/Sub-industry: CorpsEmsec 조인
    if (emsecIds.length) {
      where.corpsEmsec = { some: { emsecId: { in: emsecIds } } };
    }

    const [corps, total] = await Promise.all([
      prisma.corps.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [safeSort]: order },
        select: {
          id: true,
          stockExchange: true,
          corpTicker: true,
          corpNameLocal: true,
          corpNameEn: true,
          corpNameListed: true,
          settlePeriod: true,
          dateListed: true,

          corpsEmsec: {
            take: 1,
            orderBy: [{ rank: 'asc' }, { id: 'asc' }], // rank가 없으면 id만
            select: {
              emsec: {
                select: {
                  id: true,
                  sector: true,
                  industry: true,
                  subIndustry: true,
                },
              },
            },
          },

          // 최신 공시명(회사공시명)
          reports: {
            take: 1,
            orderBy: { receptDate: 'desc' },
            select: {
              id: true,
              name: true,
              receptDate: true,
            },
          },

          // 최신 statement (자산/매출)
          statements: {
            take: 1,
            orderBy: { periodEnd: 'desc' },
            select: {
              id: true,
              periodEnd: true,
              assetsTtl: true,
              revenue: true,
            },
          },

          // 최신 indicators (전일 PER/EVEBITDA/패턴/시총 등)
          // NOTE: 더 엄밀히 하려면 report.receptDate에 맞춰 조인해야 하는데,
          // 우선 “최신 row”가 최신을 의미한다는 가정으로 id desc 사용.
          indicators: {
            take: 1,
            orderBy: { id: 'desc' },
            select: {
              marketCapEnd: true,
              perPrev: true,
              evEbitdaPrev: true,
              revenuePattern_3y: true,
              operatingProfitPattern_3y: true,
            },
          },
        },
      }),
      prisma.corps.count({ where }),
    ]);

    const rows = corps.map((c) => {
      const r = c.reports?.[0] ?? null;
      const s = c.statements?.[0] ?? null;
      const i = c.indicators?.[0] ?? null;
      const rep = c.corpsEmsec?.[0]?.emsec ?? null;

      return {
        id: c.id,
        corpName: c.corpNameEn ?? c.corpNameLocal ?? null,

        // 테이블 요구 필드
        corpNameListed: c.corpNameListed ?? null, // 회사공시명
        stockExchange: c.stockExchange ?? null, // 거래소
        corpTicker: c.corpTicker ?? null, // 종목코드
        settlePeriod: c.settlePeriod ?? null, // 결산주기
        ltmTotalAssets: s?.assetsTtl ?? null, // (정의 재확인 필요)
        ltmMarketCap: i?.marketCapEnd ?? null, // (정의 재확인 필요)
        ltmRevenue: s?.revenue ?? null, // (정의 재확인 필요)
        revenuePattern: i?.revenuePattern_3y ?? null,
        operatingProfitPattern: i?.operatingProfitPattern_3y ?? null,
        perPrev: i?.perPrev ?? null,
        evEbitdaPrev: i?.evEbitdaPrev ?? null,

        //emsec
        sector: rep?.sector ?? null,
        industry: rep?.industry ?? null,
        subIndustry: rep?.subIndustry ?? null,
        emsecId: rep?.id ?? null,

        // 참고
        latestReportDate: r?.receptDate ?? null,
        latestPeriodEnd: s?.periodEnd ?? null,
      };
    });

    return NextResponse.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      sorting: { sort: safeSort, order },
      filters: { q, exchanges, emsecIds },
    });
  } catch (err) {
    console.error('Error fetching corps:', err);
    return NextResponse.json(
      { error: 'Failed to fetch corporations' },
      { status: 500 }
    );
  }
}
