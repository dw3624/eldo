/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const SORT_FIELDS = new Set([
  'corpNameEn',
  'corpTicker',
  'stockExchange',
  'settlePeriod',
  'dateListed',
]);

const US_EXCHANGES = new Set(['us_all', 'nye', 'nasdaq']);

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

    const sort = searchParams.get('sort') || 'corpNameEn';
    const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';
    const safeSort = SORT_FIELDS.has(sort) ? sort : 'corpNameEn';

    // search & filters
    const exchange = searchParams.get('exchange') || 'all';
    const q = (searchParams.get('q') || '').trim();
    const emsecParam = searchParams.get('emsec');

    const isUSExchange = exchange ? US_EXCHANGES.has(exchange) : false;

    // base where
    const where: any = {};

    // 검색어 필터
    if (q) {
      where.OR = [
        { corpNameLocal: { contains: q, mode: 'insensitive' as const } },
        { corpNameEn: { contains: q, mode: 'insensitive' as const } },
        { corpTicker: { contains: q, mode: 'insensitive' as const } },
      ];
    }

    // 거래소 필터
    if (exchange !== 'all') {
      if (exchange === 'ko_all') {
        where.stockExchange = { in: ['kospi', 'kosdaq'] };
      } else if (exchange === 'us_all') {
        where.stockExchange = { in: ['nye', 'nasdaq'] };
      } else if (!exchange.endsWith('_all')) {
        where.stockExchange = exchange;
      }
    }

    // emsec 필터
    if (emsecParam && emsecParam !== 'all') {
      const emsecId = parseInt(emsecParam, 10);
      const emsec = await prisma.emsec.findUnique({ where: { id: emsecId } });
      if (emsec) {
        const emsecWhere: any = {};

        if (emsec.level === 'sector') {
          emsecWhere.sectorId = emsec.id;
        } else if (emsec.level === 'industry') {
          emsecWhere.industryId = emsec.id;
        } else if (emsec.level === 'sub_industry') {
          emsecWhere.id = emsec.id;
        }

        const emsecItems = await prisma.emsec.findMany({
          where: emsecWhere,
          select: { id: true },
        });

        const targetEmsecIds = await emsecItems.map((i) => i.id);
        where.corpsEmsec = {
          some: {
            emsecId: { in: targetEmsecIds },
          },
        };
      }
    }

    // === SELECT 절 구성 (동적) ===
    const baseSelect = {
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
        orderBy: [{ rank: 'asc' as const }, { id: 'asc' as const }],
        select: {
          emsecId: true,
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
    };

    const selectFields = {
      ...baseSelect,
      [isUSExchange ? 'usStatements' : 'statements']: {
        take: 1,
        orderBy: { periodEnd: 'desc' as const },
        select: { id: true, periodEnd: true, assetsTtl: true, revenue: true },
      },
      [isUSExchange ? 'usIndicators' : 'indicators']: {
        take: 1,
        orderBy: { id: 'desc' as const },
        select: {
          marketCapEnd: true,
          perPrev: true,
          evEbitdaPrev: true,
          revenuePattern_3y: true,
          operatingProfitPattern_3y: true,
        },
      },
    };

    // === 데이터 조회 ===
    const [corps, total] = await Promise.all([
      prisma.corps.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [safeSort]: order },
        select: selectFields,
      }),
      prisma.corps.count({ where }),
    ]);

    // === 응답 데이터 매핑 ===
    const rows = corps.map((c: any) => {
      const s = isUSExchange ? c.usStatements?.[0] : c.statements?.[0];
      const i = isUSExchange ? c.usIndicators?.[0] : c.indicators?.[0];
      const e = c.corpsEmsec?.[0]?.emsec ?? null;

      return {
        id: c.id,
        corpName: c.corpNameEn ?? c.corpNameLocal ?? null,
        corpNameListed: c.corpNameListed ?? null,
        stockExchange: c.stockExchange ?? null,
        corpTicker: c.corpTicker ?? null,
        settlePeriod: c.settlePeriod ?? null,

        // 재무 데이터
        ltmTotalAssets: s?.assetsTtl ?? null,
        ltmRevenue: s?.revenue ?? null,
        ltmMarketCap: i?.marketCapEnd ?? null,

        // 지표
        revenuePattern: i?.revenuePattern_3y ?? null,
        operatingProfitPattern: i?.operatingProfitPattern_3y ?? null,
        perPrev: i?.perPrev ?? null,
        evEbitdaPrev: i?.evEbitdaPrev ?? null,

        // EMSEC
        sector: e?.sector ?? null,
        industry: e?.industry ?? null,
        subIndustry: e?.subIndustry ?? null,
        emsecId: e?.id ?? null,

        // 메타 정보
        latestPeriodEnd: s?.periodEnd ?? null,
      };
    });

    // === 응답 반환 ===
    return NextResponse.json(
      {
        data: rows,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        sorting: {
          sort: safeSort,
          order,
        },
        filters: {
          q: q,
          exchange: exchange,
          emsecId: emsecParam,
        },
        meta: {
          isUSExchange,
        },
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=30, s-maxage=60',
        },
      }
    );
  } catch (err) {
    console.error('Error fetching corps:', err);
    return NextResponse.json(
      { error: 'Failed to fetch corporations' },
      { status: 500 }
    );
  }
}
