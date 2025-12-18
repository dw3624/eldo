import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const toISO = (d: Date | null | undefined) => (d ? d.toISOString() : null);
const decToNumber = (v: unknown) => (v == null ? null : Number(v));
const bigToString = (v: unknown) => (v == null ? null : v.toString());

type Trade = {
  tradeDate: Date;
  currency: string;
  tradeVolume: number;
  priceCloseAdj: number;
  priceOpenAdj: number;
  priceHighAdj: number;
  priceLowAdj: number;
  marketCapAdj: number;
};

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const { searchParams } = new URL(req.url);

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 30);
    const cursor = searchParams.get('cursor');

    const where = cursor
      ? { corpId: id, tradeDate: { lt: new Date(cursor) } }
      : { corpId: id };

    const [trades, latestIndicator, total] = await Promise.all([
      prisma.stockTrades.findMany({
        where,
        orderBy: { tradeDate: 'desc' },
        take: limit,
        select: {
          tradeDate: true,
          currency: true,
          // outstandingShares: true,
          tradeVolume: true,
          priceCloseAdj: true,
          priceOpenAdj: true,
          priceHighAdj: true,
          priceLowAdj: true,
          marketCapAdj: true,
        },
      }),
      prisma.indicators.findFirst({
        where: { corpId: id },
        orderBy: { createdAt: 'desc' },
        select: {
          evEnd: true,
          perEnd: true,
          pbrEnd: true,
          psrEnd: true,
          pcrEnd: true,
          evSalesEnd: true,
          evEbitdaEnd: true,
          marketCapEnd: true,
          createdAt: true,
        },
      }),

      prisma.stockTrades.count({ where: { corpId: id } }),
    ]);

    const data = trades.map((t: Trade) => ({
      tradeDate: toISO(t.tradeDate),
      currency: t.currency ?? null,
      tradeVolume: bigToString(t.tradeVolume),
      priceCloseAdj: decToNumber(t.priceCloseAdj),
      priceOpenAdj: decToNumber(t.priceOpenAdj),
      priceHighAdj: decToNumber(t.priceHighAdj),
      priceLowAdj: decToNumber(t.priceLowAdj),
      marketCapAdj: decToNumber(t.marketCapAdj),
    }));

    const snapshotIndicators = latestIndicator
      ? {
          evEnd: decToNumber(latestIndicator.evEnd),
          perEnd: decToNumber(latestIndicator.perEnd),
          pbrEnd: decToNumber(latestIndicator.pbrEnd),
          psrEnd: decToNumber(latestIndicator.psrEnd),
          pcrEnd: decToNumber(latestIndicator.pcrEnd),
          evSalesEnd: decToNumber(latestIndicator.evSalesEnd),
          evEbitdaEnd: decToNumber(latestIndicator.evEbitdaEnd),
          marketCapEnd: decToNumber(latestIndicator.marketCapEnd),
        }
      : null;

    const nextCursor = data.length ? data[data.length - 1].tradeDate : null;

    return NextResponse.json({
      data,
      snapshotIndicators,
      page: { limit, nextCursor },
    });
  } catch (error) {
    console.error('Error fetching stock trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock trades' },
      { status: 500 }
    );
  }
}
