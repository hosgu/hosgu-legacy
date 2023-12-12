import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getFullLocale } from '@architecturex/utils.i18n'

export function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const at = cookieStore.get('at')?.value
  const locale = getFullLocale(cookieStore.get('language')?.value || 'en')
  const nextRequest = request.nextUrl.pathname.includes('_next')

  if (nextRequest) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL(`/${locale}`, request.url))
  }

  if (request.nextUrl.pathname === '/signup') {
    if (!at) {
      return NextResponse.redirect(new URL(`/${locale}/signup`, request.url))
    }

    return NextResponse.next()
  }

  if (request.nextUrl.pathname === '/profile/setup') {
    const code = request.nextUrl.searchParams.get('code')

    if (code?.length === 10) {
      return NextResponse.redirect(new URL(`/${locale}/profile/setup?code=${code}`, request.url))
    }

    return NextResponse.next()
  }

  if (request.nextUrl.pathname === '/login') {
    if (at) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    } else {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }
  }

  if (request.nextUrl.pathname === '/dashboard') {
    if (!at) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }

    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
  }

  return NextResponse.next()
}
