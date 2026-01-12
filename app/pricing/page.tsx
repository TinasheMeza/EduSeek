export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Basic</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">Free</p>
            <ul className="space-y-2 text-gray-600">
              <li>Basic school listing</li>
              <li>Profile management</li>
              <li>Contact inquiries</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-2 border-blue-500">
            <h3 className="text-xl font-semibold mb-4">Featured</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">R299<span className="text-lg">/month</span></p>
            <ul className="space-y-2 text-gray-600">
              <li>Everything in Basic</li>
              <li>Featured placement</li>
              <li>Enhanced analytics</li>
              <li>Priority support</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Premium</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">R599<span className="text-lg">/month</span></p>
            <ul className="space-y-2 text-gray-600">
              <li>Everything in Featured</li>
              <li>Top placement</li>
              <li>Advanced analytics</li>
              <li>Dedicated support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
