// lib/corps/get-corp-desc.ts
import prisma from '@/lib/prisma';

const toISO = (d: Date | null | undefined) => (d ? d.toISOString() : null);

// Prisma.Decimal은 Number(v)로 변환 가능하지만, null/undefined는 null로 유지
const decToNumber = (v: unknown) => (v == null ? null : Number(v));

export type CorpDescDto = {
  emsec: Array<{
    emsecId: number;
    pathKo: string;
    pathEn: string;
    ratio: number | null;
    rank: number | null;
  }>;

  corpNameEn: string | null;
  corpNameLocal: string | null;
  id: string;

  corpNameListed: string | null;
  stockExchange: string | null;
  corpTicker: string | null;
  settlePeriod: string | null;

  homepage: string | null;

  dateFounded: string | null;
  dateListed: string | null;
  statusListing: string | null;
  statusDate: string | null;

  corpSize: string | null;
  groupName: string | null;

  corpId: string | null;
  bizId: string | null;

  ceoName: string | null;
  majorHolder: string | null;

  telNo: string | null;
  emailAddr: string | null;

  country: string | null;
  region: string | null;

  addrEn: string | null;
  addrLocal: string | null;

  bizOverview: string | null;
  salesInfo: string | null;
};

export type GetCorpDescResult =
  | { ok: true; data: CorpDescDto }
  | { ok: false; status: 404; error: 'Not found' }
  | { ok: false; status: 500; error: 'Failed to fetch corp desc' };

export async function getCorpDesc(id: string): Promise<GetCorpDescResult> {
  try {
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

    if (!corp) return { ok: false, status: 404, error: 'Not found' };

    const emsec = (corp.corpsEmsec ?? []).map((x) => {
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

    const dto: CorpDescDto = {
      emsec,

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

    return { ok: true, data: dto };
  } catch (e) {
    console.error(e);
    return { ok: false, status: 500, error: 'Failed to fetch corp desc' };
  }
}
