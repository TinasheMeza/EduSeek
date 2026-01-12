import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

export default async function SchoolProfilePage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()

  // Load school profile
  const { data: school } = await supabase
    .from('school_profiles')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_approved', true)
    .eq('is_active', true)
    .single()

  if (!school) {
    notFound()
  }

  // Load school content
  const { data: images } = await supabase
    .from('school_images')
    .select('*')
    .eq('school_id', school.id)
    .order('display_order', { ascending: true })

  const { data: sports } = await supabase
    .from('school_sports')
    .select('*')
    .eq('school_id', school.id)

  const { data: activities } = await supabase
    .from('school_activities')
    .select('*')
    .eq('school_id', school.id)

  const { data: events } = await supabase
    .from('school_events')
    .select('*')
    .eq('school_id', school.id)
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(5)

  // Track profile view
  await supabase.from('analytics_events').insert({
    event_type: 'profile_view',
    school_id: school.id,
  })

  const coverImage = images?.find((img) => img.image_type === 'cover')?.image_url ||
    school.cover_image_url
  const galleryImages = images?.filter((img) => img.image_type === 'gallery') || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      {coverImage && (
        <div className="h-64 md:h-96 bg-gray-200 relative">
          <Image
            src={coverImage}
            alt={school.school_name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{school.school_name}</h1>
                {school.is_verified && (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                {school.address}, {school.city}, {school.province}
              </p>
              {school.established_year && (
                <p className="text-sm text-gray-500 mt-1">
                  Established {school.established_year}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Link href={`/schools/${school.slug}/contact`}>
                <Button variant="primary" size="lg" className="w-full md:w-auto">
                  Contact School
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {school.description && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700 whitespace-pre-line">{school.description}</p>
              </div>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages
                    .filter((image) => image.image_url)
                    .map((image) => (
                      <div key={image.id} className="relative h-48">
                        <Image
                          src={image.image_url}
                          alt={image.caption || 'School image'}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Sports */}
            {sports && sports.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Sports</h2>
                <div className="flex flex-wrap gap-2">
                  {sports.map((sport) => (
                    <span
                      key={sport.id}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {sport.sport_name}
                      {sport.level && ` (${sport.level})`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Activities */}
            {activities && activities.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Activities</h2>
                <div className="space-y-2">
                  {activities.map((activity) => (
                    <div key={activity.id}>
                      <h3 className="font-medium">{activity.activity_name}</h3>
                      {activity.description && (
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            {events && events.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-medium">{event.title}</h3>
                      {event.event_date && (
                        <p className="text-sm text-gray-600">
                          {new Date(event.event_date).toLocaleDateString()}
                          {event.event_time && ` at ${event.event_time}`}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-sm text-gray-700 mt-1">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Key Information</h2>
              <dl className="space-y-3">
                {school.school_type && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">School Type</dt>
                    <dd className="text-sm text-gray-900 capitalize">{school.school_type}</dd>
                  </>
                )}
                {school.grade_range && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Grade Range</dt>
                    <dd className="text-sm text-gray-900 capitalize">{school.grade_range}</dd>
                  </>
                )}
                {school.fees_min && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Annual Fees</dt>
                    <dd className="text-sm text-gray-900">
                      {school.fees_min === school.fees_max
                        ? formatCurrency(school.fees_min, school.fees_currency)
                        : `${formatCurrency(school.fees_min, school.fees_currency)} - ${formatCurrency(school.fees_max || school.fees_min, school.fees_currency)}`}
                    </dd>
                  </>
                )}
                {school.matric_pass_rate && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Matric Pass Rate</dt>
                    <dd className="text-sm text-gray-900">{school.matric_pass_rate}%</dd>
                  </>
                )}
                {school.student_count && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Student Count</dt>
                    <dd className="text-sm text-gray-900">{school.student_count.toLocaleString()}</dd>
                  </>
                )}
              </dl>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <dl className="space-y-2">
                {school.phone && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900">
                      <a href={`tel:${school.phone}`} className="text-blue-600 hover:underline">
                        {school.phone}
                      </a>
                    </dd>
                  </>
                )}
                {school.email && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">
                      <a href={`mailto:${school.email}`} className="text-blue-600 hover:underline">
                        {school.email}
                      </a>
                    </dd>
                  </>
                )}
                {school.website && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Website</dt>
                    <dd className="text-sm text-gray-900">
                      <a
                        href={school.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </dd>
                  </>
                )}
              </dl>
            </div>

            {/* Map Location */}
            {school.latitude && school.longitude && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-sm">
                    Map integration would go here
                    <br />
                    ({school.latitude}, {school.longitude})
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
