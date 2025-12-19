import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const toISO = (d: Date | null | undefined) => (d ? d.toISOString() : null);
const decToNumber = (v: unknown) => (v == null ? null : Number(v));

type CorpEmsec = {
  emsecId: number;
  ratio: Prisma.Decimal | null;
  rank: number | null;
  emsec: {
    sector: string | null;
    sectorEn: string | null;
    industry: string | null;
    industryEn: string | null;
    subIndustry: string | null;
    subIndustryEn: string | null;
  };
};

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;

    const corp = await prisma.corps.findUnique({
      where: { id },
      select: {
        id: true,
        corpNameEn: true,
        corpNameLocal: true,
        corpNameListed: true,
        stockExchange: true,
        corpTicker: true,
        settlePeriod: true,
        homepage: true,
        dateFounded: true,
        dateListed: true,
        statusListing: true,
        statusDate: true,
        corpSize: true,
        groupName: true,
        corpId: true,
        bizId: true,
        ceoName: true,
        majorHolder: true,
        telNo: true,
        emailAddr: true,
        countryCode: true,
        regionLarge: true,
        regionDetail: true,
        addrEn: true,
        addrLocal: true,
        bizOverview: true,
        salesInfo: true,

        // ✅ emsec + ratio + rank
        corpsEmsec: {
          orderBy: [{ rank: 'asc' }, { ratio: 'desc' }, { id: 'asc' }],
          select: {
            emsecId: true,
            ratio: true,
            rank: true,
            emsec: {
              select: {
                sector: true,
                industry: true,
                subIndustry: true,
                sectorEn: true,
                industryEn: true,
                subIndustryEn: true,
              },
            },
          },
        },
      },
    });

    if (!corp)
      return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const emsec = (corp.corpsEmsec ?? []).map((x: CorpEmsec) => {
      const e = x.emsec;
      const pathKo = [e?.sector, e?.industry, e?.subIndustry]
        .filter(Boolean)
        .join(' > ');
      const pathEn = [e?.sectorEn, e?.industryEn, e?.subIndustryEn]
        .filter(Boolean)
        .join(' > ');
      return {
        emsecId: x.emsecId,
        pathKo: pathKo || '-',
        pathEn: pathEn || '-',
        ratio: decToNumber(x.ratio),
        rank: x.rank ?? null,
      };
    });

    const dto = {
      emsec, // ✅

      corpNameEn: corp.corpNameEn ?? null,
      corpNameLocal: corp.corpNameLocal ?? null,
      id: corp.id,

      corpNameListed: corp.corpNameListed ?? null,
      stockExchange: corp.stockExchange ?? null,
      corpTicker: corp.corpTicker ?? null,
      settlePeriod: corp.settlePeriod ?? null,

      homepage: corp.homepage ?? null,

      dateFounded: toISO(corp.dateFounded),
      dateListed: toISO(corp.dateListed),
      statusListing: corp.statusListing ?? null,
      statusDate: toISO(corp.statusDate),

      corpSize: corp.corpSize ?? null,
      groupName: corp.groupName ?? null,

      corpId: corp.corpId ?? null,
      bizId: corp.bizId ?? null,

      ceoName: corp.ceoName ?? null,
      majorHolder: corp.majorHolder ?? null,

      telNo: corp.telNo ?? null,
      emailAddr: corp.emailAddr ?? null,

      country: corp.countryCode ?? null,
      region:
        [corp.regionLarge, corp.regionDetail].filter(Boolean).join(' > ') ||
        null,

      addrEn: corp.addrEn ?? null,
      addrLocal: corp.addrLocal ?? null,

      bizOverview: corp.bizOverview ?? null,
      salesInfo: corp.salesInfo ?? null,
    };

    return NextResponse.json({ data: dto });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to fetch corp desc' },
      { status: 500 }
    );
  }
}
