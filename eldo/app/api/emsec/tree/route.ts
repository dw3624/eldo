import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export type FlatNode = { id: string; label: string; parentId?: string };

const norm = (v: string | null | undefined) => (v ?? '').trim();

export async function GET() {
  try {
    const rows = await prisma.emsec.findMany({
      select: {
        id: true,
        sectorEn: true,
        industryEn: true,
        subIndustryEn: true,
      },
    });

    const sectorSet = new Set<string>();
    const industrySet = new Set<string>(); // sector||industry
    const leafNodes: FlatNode[] = [];

    for (const r of rows) {
      const sector = norm(r.sectorEn);
      const industry = norm(r.industryEn);
      const sub = norm(r.subIndustryEn);

      if (!sector) continue;
      sectorSet.add(sector);

      if (industry) {
        industrySet.add(`${sector}||${industry}`);
      }

      // leaf: emsec:<id> 로 고정 (필터/조인 용이)
      if (industry && sub) {
        leafNodes.push({
          id: `emsec:${r.id}`,
          label: sub,
          parentId: `industry:${sector}||${industry}`,
        });
      }
    }

    const nodes: FlatNode[] = [];

    // sector
    [...sectorSet]
      .sort((a, b) => a.localeCompare(b, 'ko'))
      .forEach((sector) => {
        nodes.push({ id: `sector:${sector}`, label: sector });
      });

    // industry
    [...industrySet]
      .sort((a, b) => a.localeCompare(b, 'ko'))
      .forEach((key) => {
        const [sector, industry] = key.split('||');
        nodes.push({
          id: `industry:${sector}||${industry}`,
          label: industry,
          parentId: `sector:${sector}`,
        });
      });

    // sub-industry leaves
    leafNodes
      .sort((a, b) => a.label.localeCompare(b.label, 'ko'))
      .forEach((n) => nodes.push(n));

    return NextResponse.json({ data: nodes });
  } catch (e) {
    console.error('Error building emsec tree:', e);
    return NextResponse.json(
      { error: 'Failed to fetch emsec tree' },
      { status: 500 }
    );
  }
}
