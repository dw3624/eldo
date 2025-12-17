import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const indicators = await prisma.indicator.findMany({
      where: { corpId: id },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        report: {
          select: {
            name: true,
            receptDate: true,
          },
        },
      },
    });

    return NextResponse.json({ data: indicators });
  } catch (error) {
    console.error('Error fetching indicators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch indicators' },
      { status: 500 }
    );
  }
}
