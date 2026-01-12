import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  const protectedRoutes = [
    '/dashboard',
    '/parent',
    '/school',
    '/admin',
    '/super-admin',
  ]

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Role-based route protection
  if (user) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role, is_suspended')
      .eq('id', user.id)
      .single()

    if (profile?.is_suspended) {
      return NextResponse.redirect(new URL('/auth/suspended', request.url))
    }

    // Parent routes
    if (request.nextUrl.pathname.startsWith('/parent')) {
      if (profile?.role !== 'parent') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    // School routes
    if (request.nextUrl.pathname.startsWith('/school')) {
      if (profile?.role !== 'school') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    // Admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!['admin', 'super_admin'].includes(profile?.role || '')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    // Super admin routes
    if (request.nextUrl.pathname.startsWith('/super-admin')) {
      if (profile?.role !== 'super_admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
