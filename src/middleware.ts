import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// LÓGICA DE PROTEÇÃO DE ROTA (DNA Seção 5.2)
export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth')
 
  // Protege a rota do administrador (Front-end)
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protege a API administrativa (Back-end)
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    if (!authCookie || authCookie.value !== 'true') {
      return new NextResponse(
        JSON.stringify({ error: 'Não autorizado.' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
    }
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: '/admin/:path*',
}
