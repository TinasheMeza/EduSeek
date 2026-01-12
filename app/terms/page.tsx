export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow p-8 prose max-w-none">
          <p className="text-gray-700">
            These Terms of Service govern your use of the EduSeek platform.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using EduSeek, you accept and agree to be bound by these terms.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">User Responsibilities</h2>
          <p className="text-gray-700">
            Users are responsible for maintaining the confidentiality of their account information.
          </p>
          <p className="text-gray-600 text-sm mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
