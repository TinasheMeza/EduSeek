import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function SuperAdminDashboard() {
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

  if (profile?.role !== 'super_admin') {
    redirect('/dashboard')
  }

  // Load comprehensive platform metrics
  const { data: allUsers } = await supabase
    .from('user_profiles')
    .select('role, created_at')

  const { data: allSchools } = await supabase
    .from('school_profiles')
    .select('is_approved, created_at')

  const { data: allPayments } = await supabase
    .from('payments')
    .select('amount, status, created_at')

  const { data: allAnalytics } = await supabase
    .from('analytics_events')
    .select('event_type, created_at')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  // Calculate metrics
  const totalUsers = allUsers?.length || 0
  const usersByRole = {
    parent: allUsers?.filter((u) => u.role === 'parent').length || 0,
    school: allUsers?.filter((u) => u.role === 'school').length || 0,
    admin: allUsers?.filter((u) => u.role === 'admin').length || 0,
  }

  const totalSchools = allSchools?.length || 0
  const approvedSchools = allSchools?.filter((s) => s.is_approved).length || 0

  const totalRevenue =
    allPayments
      ?.filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + Number(p.amount), 0) || 0

  const searches = allAnalytics?.filter((a) => a.event_type === 'search').length || 0
  const profileViews = allAnalytics?.filter((a) => a.event_type === 'profile_view').length || 0

  // Growth metrics (last 30 days vs previous 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)

  const recentUsers =
    allUsers?.filter((u) => new Date(u.created_at) >= thirtyDaysAgo).length || 0
  const previousUsers =
    allUsers?.filter(
      (u) =>
        new Date(u.created_at) >= sixtyDaysAgo && new Date(u.created_at) < thirtyDaysAgo
    ).length || 0

  const userGrowth = previousUsers > 0 ? ((recentUsers - previousUsers) / previousUsers) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Complete platform overview and analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
            <p className="text-sm text-gray-500 mt-1">
              {userGrowth > 0 ? '+' : ''}
              {userGrowth.toFixed(1)}% growth
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Schools</h3>
            <p className="text-3xl font-bold text-gray-900">{totalSchools}</p>
            <p className="text-sm text-gray-500 mt-1">{approvedSchools} approved</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">
              R{totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Searches (30d)</h3>
            <p className="text-3xl font-bold text-gray-900">{searches}</p>
            <p className="text-sm text-gray-500 mt-1">{profileViews} profile views</p>
          </div>
        </div>

        {/* User Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Parents</h3>
            <p className="text-3xl font-bold text-gray-900">{usersByRole.parent}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Schools</h3>
            <p className="text-3xl font-bold text-gray-900">{usersByRole.school}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Admins</h3>
            <p className="text-3xl font-bold text-gray-900">{usersByRole.admin}</p>
          </div>
        </div>

        {/* Platform Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            href="/super-admin/users"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Manage Users</h3>
            <p className="text-sm text-gray-600">View all users and roles</p>
          </Link>
          <Link
            href="/super-admin/admins"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Manage Admins</h3>
            <p className="text-sm text-gray-600">Promote/demote admins</p>
          </Link>
          <Link
            href="/super-admin/analytics"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Full Analytics</h3>
            <p className="text-sm text-gray-600">Complete platform metrics</p>
          </Link>
          <Link
            href="/super-admin/settings"
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-1">Platform Settings</h3>
            <p className="text-sm text-gray-600">Configure platform</p>
          </Link>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">User Activity (Last 30 Days)</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">New Users:</span>
                  <span className="font-medium">{recentUsers}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Searches:</span>
                  <span className="font-medium">{searches}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Profile Views:</span>
                  <span className="font-medium">{profileViews}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Revenue Summary</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Total Revenue:</span>
                  <span className="font-medium">R{totalRevenue.toLocaleString()}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Completed Payments:</span>
                  <span className="font-medium">
                    {allPayments?.filter((p) => p.status === 'completed').length || 0}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Pending Payments:</span>
                  <span className="font-medium">
                    {allPayments?.filter((p) => p.status === 'pending').length || 0}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
