import fs from 'node:fs/promises';
import path from 'node:path';

type AnyJson = unknown;

type CacheEntry = {
  loadedAt: number;
  value: AnyJson;
};

const memoryCache = new Map<string, CacheEntry>();

// 필요하면 TTL 적용(예: 5분)
const TTL_MS = 5 * 60 * 1000;

function makeKey(
  fy: string,
  exchange: string,
  chartType: string,
  level: string,
  var1?: string,
  var2?: string,
  var3?: string
) {
  return `${chartType}|${fy}|${exchange}|${level}|${var1}|${var2}|${var3}`;
}

export async function loadAnalysisJson(opts: {
  chartType: string;
  fy: string;
  exchange: string;
  level: string;
  var1?: string;
  var2?: string;
  var3?: string;
  version?: string; // v1 기본
}) {
  const {
    chartType,
    fy,
    exchange,
    level,
    var1,
    var2,
    var3,
    version = 'v1',
  } = opts;
  const key = makeKey(fy, exchange, chartType, level, var1, var2, var3);

  const cached = memoryCache.get(key);
  if (cached && Date.now() - cached.loadedAt < TTL_MS) {
    return cached.value;
  }

  const filePath = path.join(
    process.cwd(),
    'data',
    'analysis',
    chartType,
    fy,
    exchange,
    level,
    `${var1}_${var2}_${var3}.json`
  );

  const raw = await fs.readFile(filePath, 'utf-8');
  const parsed = JSON.parse(raw);

  memoryCache.set(key, { loadedAt: Date.now(), value: parsed });
  return parsed;
}
