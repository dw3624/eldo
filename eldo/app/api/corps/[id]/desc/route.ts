// app/api/corps/[id]/desc/route.ts
import { getCorpDesc } from '@/app/company/[id]/_lib/get-corp-desc';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const result = await getCorpDesc(id);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json({ data: result.data });
}
