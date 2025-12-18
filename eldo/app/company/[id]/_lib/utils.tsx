export function formatCompact(value: number, currency?: string | null): string {
  if (value == null || Number.isNaN(value)) return '-';

  if ((currency ?? '').toUpperCase() === 'KRW') {
    const abs = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (abs >= 1e12) return `${sign}${(abs / 1e12).toFixed(1)}조`;
    if (abs >= 1e8) return `${sign}${(abs / 1e8).toFixed(1)}억`;
    if (abs >= 1e4) return `${sign}${(abs / 1e4).toFixed(1)}만`;
    return `${value}`;
  }

  return new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNumber(
  value: number | string | null | undefined
): string {
  if (value == null || value === '') return '-';
  const n = typeof value === 'string' ? Number(value) : value;
  if (Number.isNaN(n)) return String(value);
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n);
}

export function formatDate(
  iso: string | null,
  type: 'default' | 'stock' = 'default'
) {
  // "1970-02-13T00:00:00.000Z" -> "1970/02/13"
  if (iso == null || iso === '') return '-';

  if (type === 'stock') {
    const date = new Date(iso);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return <span className="font-medium text-blue-600">오늘</span>;
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return <span className="text-gray-600">어제</span>;
    }
  }

  const ymd = iso.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return iso;
  return ymd.replaceAll('-', '/');
}
