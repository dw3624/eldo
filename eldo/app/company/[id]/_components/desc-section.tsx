'use client';

import Link from 'next/link';
import * as React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { FieldDef, Locale } from './fields';
import { COMPANY_INFO_FIELDS } from './fields';

type EmsecItem = {
  emsecId: number;
  pathKo: string;
  pathEn: string;
  ratio: number | null;
  rank: number | null;
};
type DescData = Record<string, unknown> & { emsec?: EmsecItem[] };

function formatPercent(ratio: number | null) {
  if (ratio == null) return '-';
  return `${ratio.toFixed(2)}%`;
}

function renderEmsec(value: unknown, locale: Locale) {
  const arr = Array.isArray(value) ? (value as EmsecItem[]) : [];
  if (!arr.length) return '-';

  return (
    <div className="space-y-2">
      {arr.map((x) => {
        const path = locale === 'en' ? x.pathEn : x.pathKo;
        return (
          <div
            key={x.emsecId}
            className="flex flex-wrap items-center gap-2 rounded-md border px-3 py-2"
          >
            <div className="font-medium">{path}</div>
            <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                rank: <span className="text-foreground">{x.rank ?? '-'}</span>
              </span>
              <span>
                ratio:{' '}
                <span className="text-foreground">
                  {formatPercent(x.ratio)}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatDateSlash(iso: string) {
  // "1970-02-13T00:00:00.000Z" -> "1970/02/13"
  if (!iso) return '-';
  const ymd = iso.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return iso;
  return ymd.replaceAll('-', '/');
}

function renderValue(field: FieldDef, row: DescData, locale: Locale) {
  const empty = field.emptyText ?? '-';
  const value = row?.[field.key];

  if (field.key === 'emsec') {
    return renderEmsec(value, locale);
  }

  if (value == null || value === '') return empty;

  if (field.type === 'date') {
    if (typeof value === 'string') return formatDateSlash(value);
    if (value instanceof Date) return formatDateSlash(value.toISOString());
    return empty;
  }

  if (field.type === 'link') {
    const href = String(value);
    if (!href) return empty;
    const isHttp = /^https?:\/\//i.test(href);
    return isHttp ? (
      <a className="underline" href={href} target="_blank" rel="noreferrer">
        {href}
      </a>
    ) : (
      <Link className="underline" href={href}>
        {href}
      </Link>
    );
  }

  if (typeof value === 'bigint') return value.toString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function CellText({
  text,
  multiline,
}: {
  text: React.ReactNode;
  multiline?: boolean;
}) {
  return (
    <div
      className={
        multiline
          ? 'whitespace-pre-wrap break-words'
          : 'whitespace-normal break-words'
      }
    >
      {text}
    </div>
  );
}

export default function DescSection({
  data,
  locale = 'en',
}: {
  data: DescData;
  locale?: Locale;
}) {
  if (!data) {
    return (
      <div>
        <h2
          id="company-desc"
          className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
        >
          {locale === 'en' ? 'Description' : '설명'}
        </h2>
        <div className="mt-6 text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h2
        id="company-desc"
        className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
      >
        {locale === 'en' ? 'Description' : '설명'}
      </h2>

      <Table className="mt-6 table-fixed">
        <TableBody>
          {COMPANY_INFO_FIELDS.map((field, idx) => {
            const isFullWidth = field.span === 2;

            if (isFullWidth) {
              return (
                <TableRow key={field.key}>
                  <TableCell className="w-40 align-top bg-slate">
                    <CellText text={field.label[locale]} />
                  </TableCell>
                  <TableCell colSpan={3}>
                    <CellText
                      text={renderValue(field, data, locale)}
                      multiline={field.multiline}
                    />
                  </TableCell>
                </TableRow>
              );
            }

            const nextField = COMPANY_INFO_FIELDS[idx + 1];
            if (idx % 2 === 1 || nextField?.span === 2) return null;

            return (
              <TableRow key={field.key}>
                <TableCell className="w-40 align-top">
                  <CellText text={field.label[locale]} />
                </TableCell>
                <TableCell>
                  <CellText
                    text={renderValue(field, data, locale)}
                    multiline={field.multiline}
                  />
                </TableCell>
                <TableCell className="w-40 align-top">
                  <CellText text={nextField.label[locale]} />
                </TableCell>
                <TableCell>
                  <CellText
                    text={renderValue(nextField, data, locale)}
                    multiline={nextField.multiline}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
