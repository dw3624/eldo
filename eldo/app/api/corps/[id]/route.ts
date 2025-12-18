import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 단일 쿼리로 모든 관련 데이터 가져오기
    const corp = await prisma.corps.findUnique({
      where: { id },
      include: {
        // 최근 보고서 3개
        // reports: {
        //   take: 3,
        //   orderBy: { receptDate: 'desc' },
        //   select: {
        //     id: true,
        //     name: true,
        //     receptDate: true,
        //   },
        // },
        // 재무정보
        // statements: {
        //   take: 1,
        //   orderBy: { createdAt: 'desc' },
        // },
        // // 최근 지표 1개
        // indicators: {
        //   take: 1,
        //   orderBy: { createdAt: 'desc' },
        // },
        // 최근 주가 30일
        // stockTrades: {
        //   take: 30,
        //   orderBy: { tradeDate: 'desc' },
        //   select: {
        //     tradeDate: true,
        //     priceCloseAdj: true,
        //     marketCapAdj: true,
        //     tradeVolume: true,
        //   },
        // },
        // 산업 분류
        corpsEmsec: {
          include: {
            emsec: {
              select: {
                sector: true,
                industry: true,
              },
            },
          },
        },
      },
    });

    if (!corp) {
      return NextResponse.json(
        { error: 'Corporation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(corp);
  } catch (error) {
    console.error('Error fetching corp:', error);
    return NextResponse.json(
      { error: 'Failed to fetch corporation' },
      { status: 500 }
    );
  }
}
