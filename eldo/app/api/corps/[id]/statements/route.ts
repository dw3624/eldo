import { AnnualRow } from '@/app/company/[id]/_components/types';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const toISO = (d: Date | null | undefined) => (d ? d.toISOString() : null);
const decToNumber = (v: unknown) => (v == null ? null : Number(v));

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const { searchParams } = new URL(req.url);

    const yearsPerPage = Math.min(
      Math.max(parseInt(searchParams.get('yearsPerPage') ?? '5', 10), 3),
      5
    );
    const page = Math.max(parseInt(searchParams.get('page') ?? '1', 10), 1);

    const raw = await prisma.statements.findMany({
      where: { corpId: id, periodEnd: { not: null } },
      orderBy: { periodEnd: 'desc' },
      take: 60,
    });

    // 연도별 최신 1개 dedupe (periodEnd desc로 이미 정렬되어 있으니 처음 만난 연도가 최신)
    const byYear = new Map<number, AnnualRow>();

    for (const s of raw) {
      if (!s.periodEnd) continue;
      const year = s.periodEnd.getFullYear();
      if (byYear.has(year)) continue;

      byYear.set(year, {
        year,
        label: `FY${year}`,
        periodStart: toISO(s.periodStart),
        periodEnd: toISO(s.periodEnd),
        currency: s.currency ?? null,

        assetsTtl: decToNumber(s.assetsTtl),
        assetsCurrent: decToNumber(s.assetsCurrent),
        cashTtl: decToNumber(s.cashTtl),
        arTtl: decToNumber(s.arTtl),
        inventoryTtl: decToNumber(s.inventoryTtl),
        assetsTangibleTtl: decToNumber(s.assetsTangibleTtl),
        assetsIntangibleTtl: decToNumber(s.assetsIntangibleTtl),
        liabilitiesTtl: decToNumber(s.liabilitiesTtl),
        liabilitiesCurrent: decToNumber(s.liabilitiesCurrent),
        accountsPayableTtl: decToNumber(s.accountsPayableTtl),
        debtInterestTtl: decToNumber(s.debtInterestTtl),
        equityTtl: decToNumber(s.equityTtl),
        equityCommon: decToNumber(s.equityCommon),
        capitalPaidIn: decToNumber(s.capitalPaidIn),
        capitalPreferred: decToNumber(s.capitalPreferred),
        capitalCommon: decToNumber(s.capitalCommon),
        rtdEarningsTtl: decToNumber(s.rtdEarningsTtl),
        capitalSurplusTtl: decToNumber(s.capitalSurplusTtl),
        surplusTtl: decToNumber(s.surplusTtl),
        netBorrowing: decToNumber(s.netBorrowing),
        nwc: decToNumber(s.nwc),

        cfoTtl: decToNumber(s.cfoTtl),
        depreciationTtl: decToNumber(s.depreciationTtl),
        cfiTtl: decToNumber(s.cfiTtl),
        capex: decToNumber(s.capex),
        cffTtl: decToNumber(s.cffTtl),
        dividendsTtl: decToNumber(s.dividendsTtl),

        revenue: decToNumber(s.revenue),
        cogs: decToNumber(s.cogs),
        sgaTtl: decToNumber(s.sgaTtl),
        operatingProfit: decToNumber(s.operatingProfit),
        taxExpense: decToNumber(s.taxExpense),
        netIncome: decToNumber(s.netIncome),
        netIncomeCtrl: decToNumber(s.netIncomeCtrl),
        ebitda: decToNumber(s.ebitda),
      });
    }

    // 최신 연도 -> 과거 연도 순
    const annualAll = Array.from(byYear.values()).sort(
      (a, b) => b.year - a.year
    );

    const totalYears = annualAll.length;
    const totalPages = Math.max(1, Math.ceil(totalYears / yearsPerPage));

    const start = (page - 1) * yearsPerPage;
    const data = annualAll.slice(start, start + yearsPerPage);

    // 그래프용 최근 5년치(없으면 있는 만큼)
    const graph = annualAll.slice(0, 5).reverse(); // 오래된->최신 순이 차트엔 더 자연스러움

    // currency는 보통 동일하니 첫 값 기준
    const currency = annualAll[0]?.currency ?? null;

    return NextResponse.json({
      meta: {
        page,
        yearsPerPage,
        totalYears,
        totalPages,
        currency,
      },
      data,
      graph, // 최근 5년치 6개 항목(요청한 그대로)
    });
  } catch (error) {
    console.error('Error fetching annual statements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statements' },
      { status: 500 }
    );
  }
}
