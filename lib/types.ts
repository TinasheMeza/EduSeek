export type UserRole = 'parent' | 'school' | 'admin' | 'super_admin'

export interface UserProfile {
  id: string
  role: UserRole
  full_name: string | null
  email: string | null
  phone: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
  is_verified: boolean
  is_suspended: boolean
  last_login: string | null
  metadata: Record<string, any>
}

export interface ParentProfile {
  id: string
  preferred_location: string | null
  preferred_city: string | null
  preferred_province: string | null
  preferred_radius_km: number
  children_count: number
  notification_preferences: {
    email: boolean
    sms: boolean
    push: boolean
  }
  created_at: string
  updated_at: string
}

export interface SchoolProfile {
  id: string
  school_name: string
  slug: string
  description: string | null
  address: string
  city: string
  province: string
  postal_code: string | null
  latitude: number | null
  longitude: number | null
  phone: string | null
  email: string | null
  website: string | null
  cover_image_url: string | null
  logo_url: string | null
  is_verified: boolean
  is_approved: boolean
  is_active: boolean
  school_type: string | null
  grade_range: string | null
  fees_min: number | null
  fees_max: number | null
  fees_currency: string
  matric_pass_rate: number | null
  student_count: number | null
  established_year: number | null
  created_at: string
  updated_at: string
  approved_at: string | null
  approved_by: string | null
  metadata: Record<string, any>
}

export interface SchoolImage {
  id: string
  school_id: string
  image_url: string
  image_type: 'gallery' | 'cover' | 'logo' | 'uniform'
  caption: string | null
  display_order: number
  created_at: string
}

export interface SchoolSport {
  id: string
  school_id: string
  sport_name: string
  level: string | null
  created_at: string
}

export interface SchoolActivity {
  id: string
  school_id: string
  activity_name: string
  category: string | null
  description: string | null
  created_at: string
}

export interface SchoolEvent {
  id: string
  school_id: string
  title: string
  description: string | null
  event_date: string | null
  event_time: string | null
  location: string | null
  event_type: string | null
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface SavedSearch {
  id: string
  parent_id: string
  search_name: string
  search_params: Record<string, any>
  created_at: string
  updated_at: string
}

export interface FavoriteSchool {
  id: string
  parent_id: string
  school_id: string
  created_at: string
}

export interface Inquiry {
  id: string
  parent_id: string | null
  school_id: string
  parent_name: string
  parent_email: string
  parent_phone: string | null
  message: string | null
  inquiry_type: string
  status: 'pending' | 'responded' | 'closed'
  responded_at: string | null
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  is_read: boolean
  action_url: string | null
  created_at: string
}

export interface Promotion {
  id: string
  school_id: string
  promotion_type: 'featured' | 'boost' | 'ad_placement'
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  school_id: string
  promotion_id: string | null
  amount: number
  currency: string
  payment_provider: 'stripe' | 'payfast' | 'paygate'
  provider_transaction_id: string | null
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_data: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Ad {
  id: string
  title: string
  description: string | null
  image_url: string | null
  link_url: string
  is_active: boolean
  display_order: number
  start_date: string | null
  end_date: string | null
  click_count: number
  impression_count: number
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface SearchFilters {
  query?: string
  city?: string
  province?: string
  latitude?: number
  longitude?: number
  radius_km?: number
  school_type?: string[]
  grade_range?: string[] // 'creche', 'primary', 'high_school', 'varsity'
  fees_min?: number
  fees_max?: number
  sports?: string[]
  activities?: string[]
  verified_only?: boolean
  sort_by?: 'relevance' | 'distance' | 'fees_asc' | 'fees_desc' | 'name'
  page?: number
  limit?: number
}
