import Link from 'next/link'
import { SYSTEM_EMAILS, PLATFORM_INFO } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{PLATFORM_INFO.name}</h3>
            <p className="text-sm text-gray-600">
              Find the perfect school for your child
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {PLATFORM_INFO.location}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              For Parents
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/search"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Find Schools
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              For Schools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/school/register"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  List Your School
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} {PLATFORM_INFO.name}. All rights reserved. | {PLATFORM_INFO.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
