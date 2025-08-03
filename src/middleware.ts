import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    console.log('[middleware] No token')
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    console.log('[middleware] Token is valid')
    return NextResponse.next()
  } catch (err) {
    console.error('[middleware] Invalid token:', err)
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
