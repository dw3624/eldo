import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. 모든 emsec 데이터 가져오기 (level 순서로)
    const emsecData = await prisma.emsec.findMany({
      select: {
        id: true,
        level: true,
        parentId: true,
        sector: true,
        sectorEn: true,
        industry: true,
        industryEn: true,
      },
      where: {
        level: { in: ['sector', 'industry'] },
      },
      orderBy: [
        { level: 'asc' }, // sector → industry
        { id: 'asc' },
      ],
    });

    // 2. FilterTree 형태로 변환
    const nodes = emsecData.map((e) => ({
      id: e.id,
      label: getLabel(e),
      labelEn: getLabel(e, 'en'),
      level: e.level,
      parentId: e.parentId || null,
    }));

    // 3. 계층 구조로 빌드 (optional - flat으로 보내도 됨)
    const tree = buildTree(nodes);

    return NextResponse.json(tree);
  } catch (error) {
    console.error('Emsec tree error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emsec tree' },
      { status: 500 }
    );
  }
}

// 레이블 결정 (level에 따라)
function getLabel(e: any, lang?: string): string {
  const sector = lang === 'en' ? e.sectorEn : e.sector;
  const industry = lang === 'en' ? e.industryEn : e.industry;

  if (e.level === 'sector') return sector || 'Unknown';
  if (e.level === 'industry') return industry || 'Unknown';
  return 'Unknown';
}

// Flat 배열 → 계층 구조
function buildTree(nodes: any[]): any[] {
  const map = new Map();
  const roots: any[] = [];

  // 1. Map 생성
  nodes.forEach((node) => {
    map.set(node.id, { ...node, children: [] });
  });

  // 2. 부모-자식 연결
  nodes.forEach((node) => {
    const current = map.get(node.id);
    if (node.parentId) {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(current);
      }
    } else {
      roots.push(current);
    }
  });

  return roots;
}
