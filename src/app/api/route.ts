import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    hasToken: !!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });
}
