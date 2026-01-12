export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow p-8 prose max-w-none">
          <p className="text-gray-700">
            This Privacy Policy describes how EduSeek collects, uses, and protects your personal information.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
          <p className="text-gray-700">
            We collect information that you provide directly to us, including name, email address, and preferences.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700">
            We use your information to provide, maintain, and improve our services, and to communicate with you.
          </p>
          <p className="text-gray-600 text-sm mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
