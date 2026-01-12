import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function AdminDashboard() {
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

  if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
    redirect('/dashboard')
  }

  // Load pending schools
  const { data: pendingSchools } = await supabase
    .from('school_profiles')
    .select('*, user_profiles(full_name, email)')
    .eq('is_approved', false)
    .order('created_at', { ascending: false })
    .limit(10)

  // Load platform metrics
  const { data: totalUsers } = await supabase
    .from('user_profiles')
    .select('id', { count: 'exact', head: true })

  const { data: totalSchools } = await supabase
    .from('school_profiles')
    .select('id', { count: 'exact', head: true })

  const { data: activeAds } = await supabase
    .from('ads')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true)

  // Load recent inquiries
  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select('*, school_profiles(school_name)')
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage schools, content, and platform settings</p>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900">{totalUsers?.length || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Schools</h3>
            <p className="text-3xl font-bold text-gray-900">{totalSchools?.length || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Ads</h3>
            <p className="text-3xl font-bold text-gray-900">{activeAds?.length || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            href="/admin/schools"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Manage Schools</h3>
            <p className="text-sm text-gray-600">Approve and verify schools</p>
          </Link>
          <Link
            href="/admin/ads"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Manage Ads</h3>
            <p className="text-sm text-gray-600">Create and manage advertisements</p>
          </Link>
          <Link
            href="/admin/users"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Manage Users</h3>
            <p className="text-sm text-gray-600">View and moderate users</p>
          </Link>
          <Link
            href="/admin/analytics"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Platform Analytics</h3>
            <p className="text-sm text-gray-600">View platform metrics</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Schools */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pending School Approvals</h2>
              <Link href="/admin/schools?status=pending">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            {pendingSchools && pendingSchools.length > 0 ? (
              <ul className="space-y-3">
                {pendingSchools.map((school: any) => (
                  <li key={school.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          href={`/admin/schools/${school.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {school.school_name}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {school.city}, {school.province}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Submitted {new Date(school.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Link href={`/admin/schools/${school.id}/approve`}>
                        <Button variant="primary" size="sm">Review</Button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No pending approvals</p>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
            {recentInquiries && recentInquiries.length > 0 ? (
              <ul className="space-y-3">
                {recentInquiries.map((inquiry: any) => (
                  <li key={inquiry.id} className="border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{inquiry.parent_name}</p>
                      <p className="text-sm text-gray-500">
                        {inquiry.school_profiles?.school_name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No recent inquiries</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
