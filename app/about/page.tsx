export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h1>
        <div className="bg-white rounded-lg shadow p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">For Parents</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Search for schools using our advanced filters</li>
              <li>Compare up to 3 schools side-by-side</li>
              <li>Save your favorite schools</li>
              <li>Contact schools directly through the platform</li>
              <li>Get notified about school updates and events</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">For Schools</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Create your school profile</li>
              <li>Upload images and showcase your facilities</li>
              <li>Manage events and achievements</li>
              <li>Track analytics and inquiries</li>
              <li>Boost your visibility with promotions</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
