/**
 * EduSeek Platform Constants
 * 
 * System-wide constants including email addresses, contact information,
 * and platform configuration.
 */

// System Email Addresses (South Africa - .co.za domain)
export const SYSTEM_EMAILS = {
  support: 'support@eduseek.co.za',
  contact: 'contact@eduseek.co.za',
  info: 'info@eduseek.co.za',
  admin: 'admin@eduseek.co.za',
  noreply: 'noreply@eduseek.co.za',
  notifications: 'notifications@eduseek.co.za',
} as const

// Platform Information
export const PLATFORM_INFO = {
  name: 'EduSeek',
  fullName: 'EduSeek - School Discovery Platform',
  location: 'South Africa',
  domain: 'eduseek.co.za',
  website: 'https://www.eduseek.co.za',
} as const

// Contact Information
export const CONTACT_INFO = {
  supportEmail: SYSTEM_EMAILS.support,
  contactEmail: SYSTEM_EMAILS.contact,
  // Add phone number if available
  // phone: '+27 XX XXX XXXX',
} as const
