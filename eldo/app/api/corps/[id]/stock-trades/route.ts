import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    const trades = await prisma.stockTrades.findMany({
      where: { corpId: id },
      take: days,
      orderBy: { tradeDate: 'desc' },
      select: {
        tradeDate: true,
        priceCloseAdj: true,
        priceOpenAdj: true,
        priceHighAdj: true,
        priceLowAdj: true,
        marketCapAdj: true,
        tradeVolume: true,
      },
    });

    return NextResponse.json({ data: trades });
  } catch (error) {
    console.error('Error fetching stock trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock trades' },
      { status: 500 }
    );
  }
}
