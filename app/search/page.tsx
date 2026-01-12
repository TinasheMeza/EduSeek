'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SchoolProfile, SearchFilters, Promotion } from '@/lib/types'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

interface SchoolWithDetails extends SchoolProfile {
  promotion?: Promotion | null
  sports?: Array<{ sport_name: string }>
  subjects?: Array<{ activity_name: string }>
}

export default function SearchPage() {
  const [schools, setSchools] = useState<SchoolWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    limit: 12,
  })
  const supabase = createClient()

  const loadSchools = useCallback(async () => {
    setIsLoading(true)
    try {
      let query = supabase
        .from('school_profiles')
        .select('*')
        .eq('is_approved', true)
        .eq('is_active', true)

      // Apply filters
      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`)
      }
      if (filters.province) {
        query = query.eq('province', filters.province)
      }
      if (filters.school_type && filters.school_type.length > 0) {
        query = query.in('school_type', filters.school_type)
      }
      if (filters.grade_range && filters.grade_range.length > 0) {
        query = query.in('grade_range', filters.grade_range)
      }
      if (filters.fees_min) {
        query = query.gte('fees_min', filters.fees_min)
      }
      if (filters.fees_max) {
        query = query.lte('fees_max', filters.fees_max)
      }
      if (filters.verified_only) {
        query = query.eq('is_verified', true)
      }

      // Sorting - prioritize promoted schools
      if (filters.sort_by === 'name') {
        query = query.order('school_name', { ascending: true })
      } else if (filters.sort_by === 'fees_asc') {
        query = query.order('fees_min', { ascending: true })
      } else if (filters.sort_by === 'fees_desc') {
        query = query.order('fees_max', { ascending: false })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      const { data, error } = await query
        .range(
          ((filters.page || 1) - 1) * (filters.limit || 12),
          (filters.page || 1) * (filters.limit || 12) - 1
        )

      if (error) throw error

      // Fetch promotions, sports, and subjects for each school
      const schoolsWithDetails = await Promise.all(
        (data || []).map(async (school) => {
          // Get active promotion
          const { data: promotion } = await supabase
            .from('promotions')
            .select('*')
            .eq('school_id', school.id)
            .eq('is_active', true)
            .gte('end_date', new Date().toISOString())
            .single()

          // Get sports (limit to 3 for display)
          const { data: sports } = await supabase
            .from('school_sports')
            .select('sport_name')
            .eq('school_id', school.id)
            .limit(6)

          // Get subjects (from activities, limit to 3 for display)
          const { data: subjects } = await supabase
            .from('school_activities')
            .select('activity_name')
            .eq('school_id', school.id)
            .eq('category', 'academic')
            .limit(6)

          return {
            ...school,
            promotion: promotion || null,
            sports: sports || [],
            subjects: subjects || [],
          }
        })
      )

      // Sort: promoted schools first
      schoolsWithDetails.sort((a, b) => {
        if (a.promotion && !b.promotion) return -1
        if (!a.promotion && b.promotion) return 1
        return 0
      })

      setSchools(schoolsWithDetails)
    } catch (error) {
      console.error('Error loading schools:', error)
    } finally {
      setIsLoading(false)
    }
  }, [filters, supabase])

  useEffect(() => {
    loadSchools()
  }, [loadSchools])

  function getPromotionTag(promotion?: Promotion | null) {
    if (!promotion) return null
    if (promotion.promotion_type === 'featured') return 'FEATURED'
    if (promotion.promotion_type === 'boost') return 'PROMOTED'
    if (promotion.promotion_type === 'ad_placement') return 'TOP PLACEMENT'
    return null
  }

  function formatSchoolType(type: string | null, gradeRange: string | null) {
    const parts: string[] = []
    if (gradeRange) {
      if (gradeRange === 'primary') parts.push('Primary School')
      else if (gradeRange === 'high_school') parts.push('High School')
      else if (gradeRange === 'primary') parts.push('Combined School')
    }
    if (type) {
      parts.push(type)
    }
    return parts
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={filters.city || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, city: e.target.value, page: 1 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province
                  </label>
                  <select
                    value={filters.province || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, province: e.target.value, page: 1 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Provinces</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                    <option value="Free State">Free State</option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                    <option value="Northern Cape">Northern Cape</option>
                    <option value="North West">North West</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Type
                  </label>
                  <div className="space-y-2">
                    {['public', 'private', 'independent', 'international'].map(
                      (type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.school_type?.includes(type) || false}
                            onChange={(e) => {
                              const current = filters.school_type || []
                              const updated = e.target.checked
                                ? [...current, type]
                                : current.filter((t) => t !== type)
                              setFilters({ ...filters, school_type: updated, page: 1 })
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">
                            {type}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level
                  </label>
                  <div className="space-y-2">
                    {['creche', 'primary', 'high_school', 'varsity'].map(
                      (level) => (
                        <label key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.grade_range?.includes(level) || false}
                            onChange={(e) => {
                              const current = filters.grade_range || []
                              const updated = e.target.checked
                                ? [...current, level]
                                : current.filter((l) => l !== level)
                              setFilters({ ...filters, grade_range: updated, page: 1 })
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">
                            {level.replace('_', ' ')}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Fees Range (ZAR)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={filters.fees_min || ''}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          fees_min: e.target.value ? Number(e.target.value) : undefined,
                          page: 1,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={filters.fees_max || ''}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          fees_max: e.target.value ? Number(e.target.value) : undefined,
                          page: 1,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.verified_only || false}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          verified_only: e.target.checked,
                          page: 1,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Verified schools only
                    </span>
                  </label>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({ page: 1, limit: 12 })}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {isLoading ? 'Loading...' : `${schools.length} Schools Found`}
                </h1>
                <p className="text-sm text-gray-600">Showing all schools</p>
              </div>
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                <select
                  value={filters.sort_by || 'relevance'}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      sort_by: e.target.value as any,
                      page: 1,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="fees_asc">Fees (Low to High)</option>
                  <option value="fees_desc">Fees (High to Low)</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : schools.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No schools found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {schools.map((school) => {
                  const promotionTag = getPromotionTag(school.promotion)
                  const schoolTypes = formatSchoolType(school.school_type, school.grade_range)
                  const displayedSports = school.sports?.slice(0, 3) || []
                  const remainingSports = (school.sports?.length || 0) - displayedSports.length
                  const displayedSubjects = school.subjects?.slice(0, 3) || []
                  const remainingSubjects = (school.subjects?.length || 0) - displayedSubjects.length

                  return (
                    <Link
                      key={school.id}
                      href={`/schools/${school.slug}`}
                      className={`block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer ${
                        promotionTag ? 'border-2 border-amber-300' : 'border border-gray-200'
                      }`}
                    >
                      {/* Image with Promotion Tag */}
                      <div className="relative h-48 bg-gray-200">
                        {school.cover_image_url ? (
                          <Image
                            src={school.cover_image_url}
                            alt={school.school_name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0h6" />
                            </svg>
                          </div>
                        )}
                        {promotionTag && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              {promotionTag}
                            </span>
                          </div>
                        )}
                        <button
                          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                          aria-label="Add to favorites"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>

                      {/* School Info */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{school.school_name}</h3>
                        
                        {/* School Type Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {schoolTypes.map((type, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-1 rounded ${
                                type.includes('School')
                                  ? 'bg-blue-100 text-blue-800'
                                  : type === 'Boarding'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {type}
                            </span>
                          ))}
                        </div>

                        {/* Location */}
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{school.city}, {school.province}</span>
                        </div>

                        {/* Description */}
                        {school.description && (
                          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                            {school.description}
                          </p>
                        )}

                        {/* Annual Fees */}
                        {school.fees_min && (
                          <div className="mb-3">
                            <span className="text-sm font-semibold text-gray-900">Annual Fees: </span>
                            <span className="text-sm text-gray-700">
                              R{school.fees_min.toLocaleString()} - R{school.fees_max?.toLocaleString() || school.fees_min.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* Pass Rate (for promoted schools) */}
                        {promotionTag && school.matric_pass_rate && (
                          <div className="flex items-center mb-3">
                            <svg className="w-5 h-5 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-900">{school.matric_pass_rate}% Pass Rate</span>
                          </div>
                        )}

                        {/* Sports */}
                        {displayedSports.length > 0 && (
                          <div className="mb-3">
                            <span className="text-sm font-semibold text-gray-900">Sports: </span>
                            <span className="text-sm text-gray-700">
                              {displayedSports.map(s => s.sport_name).join(', ')}
                              {remainingSports > 0 && ` +${remainingSports}`}
                            </span>
                          </div>
                        )}

                        {/* Subjects */}
                        {displayedSubjects.length > 0 && (
                          <div className="mb-4">
                            <span className="text-sm font-semibold text-gray-900">Subjects: </span>
                            <span className="text-sm text-gray-700">
                              {displayedSubjects.map(s => s.activity_name).join(', ')}
                              {remainingSubjects > 0 && ` +${remainingSubjects}`}
                            </span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {school.phone && (
                            <a
                              href={`tel:${school.phone}`}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              Call
                            </a>
                          )}
                          {school.email && (
                            <a
                              href={`mailto:${school.email}`}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Email
                            </a>
                          )}
                          {promotionTag === 'FEATURED' && (
                            <Link
                              href={`/schools/${school.slug}`}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md hover:from-blue-700 hover:to-green-700 transition-colors text-sm font-medium"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              View Map
                            </Link>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
