import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const tag = request.nextUrl.searchParams.get('tag');
  
  // A simple security check (optional, but recommended in production)
  // const secret = request.nextUrl.searchParams.get('secret');
  // if (secret !== process.env.REVALIDATION_SECRET) {
  //   return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  // }

  if (!tag) {
    return NextResponse.json({ message: 'Missing tag param' }, { status: 400 });
  }

  try {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now(), tag });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}
