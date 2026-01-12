import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const supabase = createClient()

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Get user and redirect to appropriate dashboard
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile) {
      const role = profile.role
      switch (role) {
        case 'parent':
          return NextResponse.redirect(new URL('/parent/dashboard', requestUrl.origin))
        case 'school':
          return NextResponse.redirect(new URL('/school/dashboard', requestUrl.origin))
        case 'admin':
          return NextResponse.redirect(new URL('/admin/dashboard', requestUrl.origin))
        case 'super_admin':
          return NextResponse.redirect(new URL('/super-admin/dashboard', requestUrl.origin))
        default:
          return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
      }
    }
  }

  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
}
