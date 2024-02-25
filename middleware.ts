import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/params';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.INDEX, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/history'],
};
