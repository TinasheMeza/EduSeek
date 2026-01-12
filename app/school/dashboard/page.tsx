import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function SchoolDashboard() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'school') {
    redirect('/dashboard')
  }

  // Load school profile
  const { data: schoolProfile } = await supabase
    .from('school_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!schoolProfile) {
    redirect('/school/onboarding')
  }

  // Load analytics
  const { data: analytics } = await supabase
    .from('analytics_events')
    .select('event_type')
    .eq('school_id', user.id)
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  const profileViews = analytics?.filter((a) => a.event_type === 'profile_view').length || 0
  const clicks = analytics?.filter((a) => a.event_type === 'click').length || 0
  const inquiries = analytics?.filter((a) => a.event_type === 'contact_form').length || 0

  // Load recent inquiries
  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select('*')
    .eq('school_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // Load active promotions
  const { data: promotions } = await supabase
    .from('promotions')
    .select('*')
    .eq('school_id', user.id)
    .eq('is_active', true)
    .gte('end_date', new Date().toISOString())

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {schoolProfile.school_name}
              </h1>
              <p className="text-gray-600 mt-2">
                {schoolProfile.city}, {schoolProfile.province}
              </p>
            </div>
            <div className="flex space-x-3">
              {!schoolProfile.is_approved && (
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg">
                  Pending Approval
                </div>
              )}
              {schoolProfile.is_verified && (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                  Verified
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Profile Views</h3>
            <p className="text-3xl font-bold text-gray-900">{profileViews}</p>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Clicks</h3>
            <p className="text-3xl font-bold text-gray-900">{clicks}</p>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Inquiries</h3>
            <p className="text-3xl font-bold text-gray-900">{inquiries}</p>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            href={`/schools/${schoolProfile.slug}/edit`}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Edit Profile</h3>
            <p className="text-sm text-gray-600">Update school information</p>
          </Link>
          <Link
            href="/school/images"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Manage Images</h3>
            <p className="text-sm text-gray-600">Upload and organize photos</p>
          </Link>
          <Link
            href="/school/promotions"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Promotions</h3>
            <p className="text-sm text-gray-600">Boost your listing</p>
          </Link>
          <Link
            href="/school/analytics"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">View Analytics</h3>
            <p className="text-sm text-gray-600">Detailed performance metrics</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Inquiries */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Inquiries</h2>
              <Link href="/school/inquiries">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            {recentInquiries && recentInquiries.length > 0 ? (
              <ul className="space-y-3">
                {recentInquiries.map((inquiry: any) => (
                  <li key={inquiry.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{inquiry.parent_name}</p>
                        <p className="text-sm text-gray-500">{inquiry.parent_email}</p>
                        {inquiry.message && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {inquiry.message}
                          </p>
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          inquiry.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : inquiry.status === 'responded'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No inquiries yet</p>
            )}
          </div>

          {/* Active Promotions */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Active Promotions</h2>
              <Link href="/school/promotions">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            {promotions && promotions.length > 0 ? (
              <ul className="space-y-3">
                {promotions.map((promo: any) => (
                  <li key={promo.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium capitalize">{promo.promotion_type}</p>
                        <p className="text-sm text-gray-500">
                          Until {new Date(promo.end_date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Active
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p className="text-gray-500 text-sm mb-4">No active promotions</p>
                <Link href="/school/promotions">
                  <Button variant="primary" size="sm">Create Promotion</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
