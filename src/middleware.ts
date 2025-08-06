import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isAuth = !!token
  const url = new URL(request.url)
  const pathname = url.pathname

  if (isAuth) {
    try {
      await jwtVerify(token!, JWT_SECRET)

      if (pathname === '/' || pathname === '/auth') {
        return NextResponse.redirect(new URL('/dashboard/telegram', request.url))
      }

      return NextResponse.next()
    } catch (err) {
      console.error('[middleware] Invalid token:', err)
      const response = NextResponse.redirect(new URL('/auth', request.url))
      response.cookies.set('token', '', { maxAge: 0 })
      return response
    }
  }

  if (pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auth', '/dashboard/:path*'],
}
