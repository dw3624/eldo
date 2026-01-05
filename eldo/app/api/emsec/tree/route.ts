import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

type TreeNode = {
  id: number;
  parentId: number | null;
  level: string;
  label: string;
  labelEn: string;
};

export async function GET() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  try {
    const emsecData = await prisma.emsec.findMany({
      select: {
        id: true,
        level: true,
        parentId: true,
        sector: true,
        sectorEn: true,
        industry: true,
        industryEn: true,
        subIndustry: true,
        subIndustryEn: true,
      },
      orderBy: [{ level: 'asc' }, { id: 'asc' }],
    });

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Emsec tree error:', {
      code: error?.code,
      meta: error?.meta,
      message: error?.message,
    });
    return NextResponse.json(
      { error: 'Failed to fetch emsec tree' },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLabel(e: any, lang?: string): string {
  const sector = lang === 'en' ? e.sectorEn : e.sector;
  const industry = lang === 'en' ? e.industryEn : e.industry;
  const subIndustry = lang === 'en' ? e.subIndustryEn : e.subIndustry;

  if (e.level === 'sector') return sector || 'Unknown';
  if (e.level === 'industry') return industry || 'Unknown';
  if (e.level === 'sub_industry') return subIndustry || 'Unknown';
  return 'Unknown';
}

// Flat 배열 → 계층 구조
function buildTree(nodes: TreeNode[]): TreeNode[] {
  const map = new Map();
  const roots: TreeNode[] = [];

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
