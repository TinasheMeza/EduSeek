import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function ParentDashboard() {
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

  if (!profile || profile.role !== 'parent') {
    redirect('/dashboard')
  }

  // Load parent-specific data
  const { data: parentProfile } = await supabase
    .from('parent_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: favoriteSchools } = await supabase
    .from('favorite_schools')
    .select('*, school_profiles(*)')
    .eq('parent_id', user.id)
    .limit(5)

  const { data: savedSearches } = await supabase
    .from('saved_searches')
    .select('*')
    .eq('parent_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(5)

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*, school_profiles(school_name, slug)')
    .eq('parent_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_read', false)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile.full_name || 'Parent'}!
          </h1>
          <p className="text-gray-600 mt-2">Manage your school search and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/search"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Find Schools</h3>
            <p className="text-gray-600 text-sm">Search for schools in your area</p>
          </Link>

          <Link
            href="/parent/favorites"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Favorite Schools</h3>
            <p className="text-gray-600 text-sm">
              {favoriteSchools?.length || 0} saved schools
            </p>
          </Link>

          <Link
            href="/parent/comparisons"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Compare Schools</h3>
            <p className="text-gray-600 text-sm">Compare up to 3 schools side-by-side</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Saved Searches */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Saved Searches</h2>
              <Link href="/parent/searches">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            {savedSearches && savedSearches.length > 0 ? (
              <ul className="space-y-3">
                {savedSearches.map((search) => (
                  <li key={search.id} className="border-b pb-3 last:border-0">
                    <Link
                      href={`/search?${new URLSearchParams(search.search_params).toString()}`}
                      className="text-blue-600 hover:underline"
                    >
                      {search.search_name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      Updated {new Date(search.updated_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No saved searches yet</p>
            )}
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Inquiries</h2>
              <Link href="/parent/inquiries">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            {inquiries && inquiries.length > 0 ? (
              <ul className="space-y-3">
                {inquiries.map((inquiry: any) => (
                  <li key={inquiry.id} className="border-b pb-3 last:border-0">
                    <Link
                      href={`/schools/${inquiry.school_profiles?.slug}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {inquiry.school_profiles?.school_name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      Status: <span className="capitalize">{inquiry.status}</span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No inquiries yet</p>
            )}
          </div>
        </div>

        {/* Notifications */}
        {notifications && notifications.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <ul className="space-y-3">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded"
                >
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
