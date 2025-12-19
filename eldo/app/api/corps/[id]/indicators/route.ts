import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const toISO = (d: Date | null | undefined) => (d ? d.toISOString() : null);
const decToNumber = (v: unknown) => (v == null ? null : Number(v));

function parseCursor(
  cursor: string | null
): { reportId: number; statementId: number } | null {
  if (!cursor) return null;
  // cursor format: "reportId:statementId"
  const [r, s] = cursor.split(':');
  const reportId = Number(r);
  const statementId = Number(s);
  if (!Number.isFinite(reportId) || !Number.isFinite(statementId)) return null;
  return { reportId, statementId };
}

function makeCursor(reportId: number | null, statementId: number) {
  if (!reportId) return null;
  return `${reportId}:${statementId}`;
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const { searchParams } = new URL(req.url);

    // 3~5개 연도 단위로 보여주고 싶다 하셨으니 default=5, max=5로 제한
    const limit = Math.min(
      Math.max(parseInt(searchParams.get('limit') ?? '5', 10), 3),
      5
    );
    const cursorRaw = searchParams.get('cursor');
    const cursor = parseCursor(cursorRaw);

    const rows = await prisma.indicators.findMany({
      where: { corpId: id },
      orderBy: [
        // 기간 기준 최신순: Indicators에 period가 없으니 statements.periodEnd로 정렬
        { statements: { periodEnd: 'desc' } },
        // 동률 방지용(안정 정렬)
        { statementId: 'desc' },
        { reportId: 'desc' },
      ],
      take: limit,
      ...(cursor
        ? {
            cursor: {
              reportId_statementId: {
                reportId: cursor.reportId,
                statementId: cursor.statementId,
              },
            },
            skip: 1,
          }
        : {}),
      select: {
        reportId: true,
        statementId: true,
        corpId: true,

        // ====== Indicators 주요 필드(요청하신 FINANCIAL_INDIC_FIELDS에 해당) ======
        marketCapEnd: true,
        marketCapOpen: true,
        marketCapHigh: true,
        marketCapLow: true,
        marketCapAvg: true,
        marketCapPrev: true,

        evEnd: true,
        evEndAvg: true,
        evPrev: true,

        sps: true,
        ebitdaps: true,
        eps: true,
        cfps: true,
        bps: true,

        psrEnd: true,
        psrAvg: true,
        psrPrev: true,
        perEnd: true,
        perAvg: true,
        perPrev: true,
        pcrEnd: true,
        pcrAvg: true,
        pcrPrev: true,
        pbrEnd: true,
        pbrAvg: true,
        pbrPrev: true,
        evSalesEnd: true,
        evSalesAvg: true,
        evSalesPrev: true,
        evEbitdaEnd: true,
        evEbitdaAvg: true,
        evEbitdaPrev: true,

        gpm: true,
        opm: true,
        npm: true,
        ebitdaMargin: true,
        roe: true,
        roa: true,
        roic: true,
        wacc: true,

        revenueGrowthRate: true,
        operatingProfitGrowthRate: true,
        ebitdaGrowthRate: true,
        netIncomeGrowthRate: true,
        cfoGrowthRate: true,
        equityGrowthRate: true,

        operatingMarginGrowthRate: true,
        ebitdaMarginGrowthRate: true,
        netMarginGrowthRate: true,

        revenueStatus: true,
        operatingProfitStatus: true,
        ebitdaStatus: true,
        netIncomeStatus: true,

        revenuePattern_3y: true,
        operatingProfitPattern_3y: true,
        ebitdaPattern_3y: true,
        netIncomePattern_3y: true,

        revenueCagr_3y: true,
        operatingProfitCagr_3y: true,
        operatingMarginCagr_3y: true,
        ebitdaCagr_3y: true,
        ebitdaMarginCagr_3y: true,
        netIncomeCagr_3y: true,
        netMarginCagr_3y: true,
        cfoCagr_3y: true,
        equityCagr_3y: true,

        revenueCagr_5y: true,
        operatingProfitCagr_5y: true,
        operatingMarginCagr_5y: true,
        ebitdaCagr_5y: true,
        ebitdaMarginCagr_5y: true,
        netIncomeCagr_5y: true,
        netMarginCagr_5y: true,
        cfoCagr_5y: true,
        equityCagr_5y: true,

        debtToEquityRatio: true,
        equityRatio: true,
        netDebtRatio: true,
        currentRatio: true,
        currentLiabilitiesRatio: true,
        capitalRetentionRatio: true,
        interestCoverageRatio: true,

        debtToEquityRatioGrowthRate: true,
        equityRatioGrowthRate: true,
        netDebtRatioGrowthRate: true,

        debtToEquityRatioCagr_3y: true,
        equityRatioCagr_3y: true,
        netDebtRatioCagr_3y: true,

        debtToEquityRatioCagr_5y: true,
        equityRatioCagr_5y: true,
        netDebtRatioCagr_5y: true,

        ttlAssetTurnover: true,
        ttlLiabilityTurnover: true,
        equityTurnover: true,
        fixedAssetTurnover: true,
        arTurnover: true,
        inventoryTurnover: true,
        apTurnover: true,

        dividendPayoutRatio: true,

        // ====== join: periodStart/periodEnd/currency ======
        statements: {
          select: {
            periodStart: true,
            periodEnd: true,
            currency: true,
          },
        },
      },
    });

    type PrismaRow = (typeof rows)[number];

    const data = rows.map((r: PrismaRow) => {
      const year = r.statements.periodEnd
        ? String(r.statements.periodEnd.getFullYear())
        : '-';
      const label = year == '-' ? null : `FY${year}`;

      return {
        reportId: r.reportId,
        statementId: r.statementId,

        year,
        label,
        periodStart: toISO(r.statements.periodStart),
        periodEnd: toISO(r.statements.periodEnd),
        currency: r.statements.currency ?? null,

        // 나머지 indicators들: Decimal -> number
        marketCapEnd: decToNumber(r.marketCapEnd),
        marketCapOpen: decToNumber(r.marketCapOpen),
        marketCapHigh: decToNumber(r.marketCapHigh),
        marketCapLow: decToNumber(r.marketCapLow),
        marketCapAvg: decToNumber(r.marketCapAvg),
        marketCapPrev: decToNumber(r.marketCapPrev),

        evEnd: decToNumber(r.evEnd),
        evEndAvg: decToNumber(r.evEndAvg),
        evPrev: decToNumber(r.evPrev),

        sps: decToNumber(r.sps),
        ebitdaps: decToNumber(r.ebitdaps),
        eps: decToNumber(r.eps),
        cfps: decToNumber(r.cfps),
        bps: decToNumber(r.bps),

        psrEnd: decToNumber(r.psrEnd),
        psrAvg: decToNumber(r.psrAvg),
        psrPrev: decToNumber(r.psrPrev),
        perEnd: decToNumber(r.perEnd),
        perAvg: decToNumber(r.perAvg),
        perPrev: decToNumber(r.perPrev),
        pcrEnd: decToNumber(r.pcrEnd),
        pcrAvg: decToNumber(r.pcrAvg),
        pcrPrev: decToNumber(r.pcrPrev),
        pbrEnd: decToNumber(r.pbrEnd),
        pbrAvg: decToNumber(r.pbrAvg),
        pbrPrev: decToNumber(r.pbrPrev),
        evSalesEnd: decToNumber(r.evSalesEnd),
        evSalesAvg: decToNumber(r.evSalesAvg),
        evSalesPrev: decToNumber(r.evSalesPrev),
        evEbitdaEnd: decToNumber(r.evEbitdaEnd),
        evEbitdaAvg: decToNumber(r.evEbitdaAvg),
        evEbitdaPrev: decToNumber(r.evEbitdaPrev),

        gpm: decToNumber(r.gpm),
        opm: decToNumber(r.opm),
        npm: decToNumber(r.npm),
        ebitdaMargin: decToNumber(r.ebitdaMargin),
        roe: decToNumber(r.roe),
        roa: decToNumber(r.roa),
        roic: decToNumber(r.roic),
        wacc: decToNumber(r.wacc),

        revenueGrowthRate: decToNumber(r.revenueGrowthRate),
        operatingProfitGrowthRate: decToNumber(r.operatingProfitGrowthRate),
        ebitdaGrowthRate: decToNumber(r.ebitdaGrowthRate),
        netIncomeGrowthRate: decToNumber(r.netIncomeGrowthRate),
        cfoGrowthRate: decToNumber(r.cfoGrowthRate),
        equityGrowthRate: decToNumber(r.equityGrowthRate),

        operatingMarginGrowthRate: decToNumber(r.operatingMarginGrowthRate),
        ebitdaMarginGrowthRate: decToNumber(r.ebitdaMarginGrowthRate),
        netMarginGrowthRate: decToNumber(r.netMarginGrowthRate),

        revenueStatus: r.revenueStatus ?? null,
        operatingProfitStatus: r.operatingProfitStatus ?? null,
        ebitdaStatus: r.ebitdaStatus ?? null,
        netIncomeStatus: r.netIncomeStatus ?? null,

        revenuePattern_3y: r.revenuePattern_3y ?? null,
        operatingProfitPattern_3y: r.operatingProfitPattern_3y ?? null,
        ebitdaPattern_3y: r.ebitdaPattern_3y ?? null,
        netIncomePattern_3y: r.netIncomePattern_3y ?? null,

        revenueCagr_3y: decToNumber(r.revenueCagr_3y),
        operatingProfitCagr_3y: decToNumber(r.operatingProfitCagr_3y),
        operatingMarginCagr_3y: decToNumber(r.operatingMarginCagr_3y),
        ebitdaCagr_3y: decToNumber(r.ebitdaCagr_3y),
        ebitdaMarginCagr_3y: decToNumber(r.ebitdaMarginCagr_3y),
        netIncomeCagr_3y: decToNumber(r.netIncomeCagr_3y),
        netMarginCagr_3y: decToNumber(r.netMarginCagr_3y),
        cfoCagr_3y: decToNumber(r.cfoCagr_3y),
        equityCagr_3y: decToNumber(r.equityCagr_3y),

        revenueCagr_5y: decToNumber(r.revenueCagr_5y),
        operatingProfitCagr_5y: decToNumber(r.operatingProfitCagr_5y),
        operatingMarginCagr_5y: decToNumber(r.operatingMarginCagr_5y),
        ebitdaCagr_5y: decToNumber(r.ebitdaCagr_5y),
        ebitdaMarginCagr_5y: decToNumber(r.ebitdaMarginCagr_5y),
        netIncomeCagr_5y: decToNumber(r.netIncomeCagr_5y),
        netMarginCagr_5y: decToNumber(r.netMarginCagr_5y),
        cfoCagr_5y: decToNumber(r.cfoCagr_5y),
        equityCagr_5y: decToNumber(r.equityCagr_5y),

        debtToEquityRatio: decToNumber(r.debtToEquityRatio),
        equityRatio: decToNumber(r.equityRatio),
        netDebtRatio: decToNumber(r.netDebtRatio),
        currentRatio: decToNumber(r.currentRatio),
        currentLiabilitiesRatio: decToNumber(r.currentLiabilitiesRatio),
        capitalRetentionRatio: decToNumber(r.capitalRetentionRatio),
        interestCoverageRatio: decToNumber(r.interestCoverageRatio),

        debtToEquityRatioGrowthRate: decToNumber(r.debtToEquityRatioGrowthRate),
        equityRatioGrowthRate: decToNumber(r.equityRatioGrowthRate),
        netDebtRatioGrowthRate: decToNumber(r.netDebtRatioGrowthRate),

        debtToEquityRatioCagr_3y: decToNumber(r.debtToEquityRatioCagr_3y),
        equityRatioCagr_3y: decToNumber(r.equityRatioCagr_3y),
        netDebtRatioCagr_3y: decToNumber(r.netDebtRatioCagr_3y),

        debtToEquityRatioCagr_5y: decToNumber(r.debtToEquityRatioCagr_5y),
        equityRatioCagr_5y: decToNumber(r.equityRatioCagr_5y),
        netDebtRatioCagr_5y: decToNumber(r.netDebtRatioCagr_5y),

        ttlAssetTurnover: decToNumber(r.ttlAssetTurnover),
        ttlLiabilityTurnover: decToNumber(r.ttlLiabilityTurnover),
        equityTurnover: decToNumber(r.equityTurnover),
        fixedAssetTurnover: decToNumber(r.fixedAssetTurnover),
        arTurnover: decToNumber(r.arTurnover),
        inventoryTurnover: decToNumber(r.inventoryTurnover),
        apTurnover: decToNumber(r.apTurnover),

        dividendPayoutRatio: decToNumber(r.dividendPayoutRatio),
      };
    });

    const last = rows[rows.length - 1];
    const nextCursor = last
      ? makeCursor(last?.reportId, last.statementId)
      : null;

    // 상단 요약은 최신(첫 번째) 기준으로 프론트에서 바로 쓸 수 있게 별도로 제공
    const latest = data[0] ?? null;
    const summary = latest
      ? {
          perPrev: latest.perPrev,
          pbrPrev: latest.pbrPrev,
          evEbitdaPrev: latest.evEbitdaPrev,

          revenuePattern_3y: latest.revenuePattern_3y,
          operatingProfitPattern_3y: latest.operatingProfitPattern_3y,
          ebitdaPattern_3y: latest.ebitdaPattern_3y,
        }
      : null;

    return NextResponse.json({
      data,
      summary,
      page: { limit, nextCursor },
    });
  } catch (error) {
    console.error('Error fetching indicators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch indicators' },
      { status: 500 }
    );
  }
}
