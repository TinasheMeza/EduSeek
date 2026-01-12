/**
 * Seed script for creating 6 schools (3 promoted, 3 organic)
 * 
 * To run this script:
 * 1. Make sure you have a Supabase project set up
 * 2. Set your environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 3. Run: npx tsx scripts/seed-schools.ts
 * 
 * Note: This script creates schools directly. You may need to create auth users separately
 * or adjust the script to create auth users first.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

interface SchoolData {
  school_name: string
  slug: string
  description: string
  address: string
  city: string
  province: string
  postal_code: string
  phone: string
  email: string
  cover_image_url: string
  school_type: string
  grade_range: string
  fees_min: number
  fees_max: number
  matric_pass_rate?: number
  established_year: number
  sports: string[]
  subjects: string[]
  is_promoted: boolean
  promotion_type?: 'featured' | 'boost' | 'ad_placement'
}

const schools: SchoolData[] = [
  // Promoted Schools
  {
    school_name: 'Greenfield Primary School',
    slug: 'greenfield-primary-school',
    description: 'Greenfield Primary provides quality education in a nurturing environment. Our focus is on developing well-rounded individuals who are prepared for the challenges of high school and beyond. We emphasize academic excellence, character development, and holistic growth.',
    address: '123 Main Road, Claremont',
    city: 'Cape Town',
    province: 'Western Cape',
    postal_code: '7708',
    phone: '+27 21 123 4567',
    email: 'info@greenfieldprimary.co.za',
    cover_image_url: 'https://images.unsplash.com/photo-1503676260728-1c00e094b736?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    school_type: 'private',
    grade_range: 'primary',
    fees_min: 35000,
    fees_max: 45000,
    established_year: 1985,
    sports: ['Rugby', 'Cricket', 'Soccer', 'Swimming', 'Athletics', 'Netball'],
    subjects: ['Mathematics', 'English', 'Afrikaans', 'Natural Sciences', 'Social Sciences', 'Life Skills'],
    is_promoted: true,
    promotion_type: 'featured'
  },
  {
    school_name: 'Johannesburg High School',
    slug: 'johannesburg-high-school',
    description: 'Excellence in education for over 50 years. We prepare learners for university and beyond with a strong academic foundation, comprehensive sports programs, and a commitment to developing future leaders. Our boarding facilities provide a supportive home-away-from-home environment.',
    address: '456 Rivonia Road, Sandton',
    city: 'Johannesburg',
    province: 'Gauteng',
    postal_code: '2196',
    phone: '+27 11 234 5678',
    email: 'admissions@jhbhigh.co.za',
    cover_image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    school_type: 'private',
    grade_range: 'high_school',
    fees_min: 65000,
    fees_max: 85000,
    matric_pass_rate: 98,
    established_year: 1970,
    sports: ['Rugby', 'Cricket', 'Hockey', 'Swimming', 'Athletics', 'Tennis', 'Soccer'],
    subjects: ['Mathematics', 'English', 'Afrikaans', 'Physical Science', 'Life Sciences', 'History', 'Geography', 'Accounting', 'Business Studies', 'Economics'],
    is_promoted: true,
    promotion_type: 'featured'
  },
  {
    school_name: 'Stellenbosch Combined School',
    slug: 'stellenbosch-combined-school',
    description: 'Grades 1-12 in one campus. Strong academic tradition with a focus on bilingual education (English/Afrikaans). We provide a comprehensive curriculum that prepares students for tertiary education while maintaining our rich cultural heritage.',
    address: '789 Church Street, Stellenbosch Central',
    city: 'Stellenbosch',
    province: 'Western Cape',
    postal_code: '7600',
    phone: '+27 21 345 6789',
    email: 'info@stellenboschcombined.co.za',
    cover_image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    school_type: 'independent',
    grade_range: 'primary',
    fees_min: 45000,
    fees_max: 70000,
    matric_pass_rate: 95,
    established_year: 1960,
    sports: ['Rugby', 'Cricket', 'Hockey', 'Swimming', 'Athletics', 'Tennis', 'Soccer', 'Basketball', 'Volleyball', 'Water Polo'],
    subjects: ['Mathematics', 'Physical Science', 'Life Sciences', 'English', 'Afrikaans', 'History', 'Geography', 'Accounting', 'Business Studies', 'Economics', 'Computer Science', 'Art'],
    is_promoted: true,
    promotion_type: 'boost'
  },
  // Organic Schools
  {
    school_name: 'Pretoria Academy',
    slug: 'pretoria-academy',
    description: 'A leading educational institution in the heart of Pretoria, offering quality education from Grade R to Grade 12. We focus on academic excellence, character building, and preparing students for success in their chosen fields.',
    address: '321 Arcadia Street, Arcadia',
    city: 'Pretoria',
    province: 'Gauteng',
    postal_code: '0083',
    phone: '+27 12 456 7890',
    email: 'info@pretoriaacademy.co.za',
    cover_image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    school_type: 'private',
    grade_range: 'primary',
    fees_min: 40000,
    fees_max: 60000,
    matric_pass_rate: 92,
    established_year: 1990,
    sports: ['Rugby', 'Cricket', 'Soccer', 'Swimming', 'Athletics', 'Netball', 'Tennis'],
    subjects: ['Mathematics', 'English', 'Afrikaans', 'Natural Sciences', 'Social Sciences', 'Life Skills', 'Technology'],
    is_promoted: false
  },
  {
    school_name: 'Durban Preparatory School',
    slug: 'durban-preparatory-school',
    description: 'Nurturing young minds in a vibrant coastal city. We provide a strong foundation in academics, sports, and the arts, ensuring our students are well-prepared for their educational journey ahead.',
    address: '555 Musgrave Road, Berea',
    city: 'Durban',
    province: 'KwaZulu-Natal',
    postal_code: '4001',
    phone: '+27 31 567 8901',
    email: 'admissions@durbanprep.co.za',
    cover_image_url: 'https://images.unsplash.com/photo-1503676260728-1c00e094b736?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    school_type: 'private',
    grade_range: 'primary',
    fees_min: 38000,
    fees_max: 52000,
    established_year: 2000,
    sports: ['Rugby', 'Cricket', 'Soccer', 'Swimming', 'Athletics', 'Netball'],
    subjects: ['Mathematics', 'English', 'Zulu', 'Natural Sciences', 'Social Sciences', 'Life Skills'],
    is_promoted: false
  },
  {
    school_name: 'Bloemfontein Primary School',
    slug: 'bloemfontein-primary-school',
    description: 'Committed to providing quality primary education in the Free State. Our dedicated teachers and comprehensive curriculum ensure that every child reaches their full potential in a supportive and caring environment.',
    address: '789 President Brand Street, Bloemfontein',
    city: 'Bloemfontein',
    province: 'Free State',
    postal_code: '9301',
    phone: '+27 51 678 9012',
    email: 'info@bloemfonteinprimary.co.za',
    cover_image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    school_type: 'public',
    grade_range: 'primary',
    fees_min: 15000,
    fees_max: 25000,
    established_year: 1988,
    sports: ['Rugby', 'Cricket', 'Soccer', 'Athletics', 'Netball'],
    subjects: ['Mathematics', 'English', 'Afrikaans', 'Natural Sciences', 'Social Sciences', 'Life Skills'],
    is_promoted: false
  }
]

async function seedSchools() {
  console.log('Starting to seed schools...')

  for (const schoolData of schools) {
    try {
      // First, create a user profile (you'll need to create auth user separately)
      // For now, we'll generate a UUID and try to insert
      const userId = crypto.randomUUID()
      
      // Try to create user profile (this will fail if auth user doesn't exist)
      const { error: userError } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          role: 'school',
          email: schoolData.email,
          full_name: schoolData.school_name,
          is_verified: true
        })

      if (userError && !userError.message.includes('duplicate')) {
        console.warn(`Could not create user profile for ${schoolData.school_name}:`, userError.message)
        console.log(`Please create an auth user first, then use this UUID: ${userId}`)
        continue
      }

      // Create school profile
      const { data: school, error: schoolError } = await supabase
        .from('school_profiles')
        .insert({
          id: userId,
          school_name: schoolData.school_name,
          slug: schoolData.slug,
          description: schoolData.description,
          address: schoolData.address,
          city: schoolData.city,
          province: schoolData.province,
          postal_code: schoolData.postal_code,
          phone: schoolData.phone,
          email: schoolData.email,
          cover_image_url: schoolData.cover_image_url,
          is_verified: true,
          is_approved: true,
          is_active: true,
          school_type: schoolData.school_type,
          grade_range: schoolData.grade_range,
          fees_min: schoolData.fees_min,
          fees_max: schoolData.fees_max,
          fees_currency: 'ZAR',
          matric_pass_rate: schoolData.matric_pass_rate || null,
          established_year: schoolData.established_year,
          approved_at: new Date().toISOString()
        })
        .select()
        .single()

      if (schoolError) {
        console.error(`Error creating school ${schoolData.school_name}:`, schoolError.message)
        continue
      }

      console.log(`✓ Created school: ${schoolData.school_name}`)

      // Add sports
      for (const sport of schoolData.sports) {
        await supabase
          .from('school_sports')
          .insert({
            school_id: userId,
            sport_name: sport,
            level: 'competitive'
          })
      }

      // Add subjects (as activities)
      for (const subject of schoolData.subjects) {
        await supabase
          .from('school_activities')
          .insert({
            school_id: userId,
            activity_name: subject,
            category: 'academic'
          })
      }

      // Create promotion if promoted
      if (schoolData.is_promoted && schoolData.promotion_type) {
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 30)
        
        await supabase
          .from('promotions')
          .insert({
            school_id: userId,
            promotion_type: schoolData.promotion_type,
            start_date: new Date().toISOString(),
            end_date: endDate.toISOString(),
            is_active: true
          })
        
        console.log(`  ✓ Added promotion: ${schoolData.promotion_type}`)
      }

      console.log(`  ✓ Added ${schoolData.sports.length} sports and ${schoolData.subjects.length} subjects`)
    } catch (error) {
      console.error(`Error processing ${schoolData.school_name}:`, error)
    }
  }

  console.log('\nSeeding complete!')
}

seedSchools()
