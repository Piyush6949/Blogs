import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'

const publicRoutes = ['/', '/signin', '/signup']

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = req.cookies.get('session_id')?.value
  const session = await decrypt(cookie)

  // ❌ Not logged in + trying to access private route
  if (!session?.id && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  // ✅ Logged in + trying to access signin/signup
  if (session?.id && (path === '/signin' || path === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

 
// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}