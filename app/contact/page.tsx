import { SYSTEM_EMAILS } from '@/lib/constants'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-700 mb-4">
            We&apos;d love to hear from you! Get in touch with us using the information below.
          </p>
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">Support Email</h2>
              <a href={`mailto:${SYSTEM_EMAILS.support}`} className="text-blue-600 hover:underline">
                {SYSTEM_EMAILS.support}
              </a>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">General Inquiries</h2>
              <a href={`mailto:${SYSTEM_EMAILS.contact}`} className="text-blue-600 hover:underline">
                {SYSTEM_EMAILS.contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
