-- Seed script for creating 6 schools (3 promoted, 3 organic)
-- Note: This script assumes you have created auth users first or will create them
-- You may need to adjust the UUIDs to match your auth.users entries

-- Step 1: Create user_profiles for schools
-- Replace the UUIDs below with actual auth.users IDs or use gen_random_uuid() if you create auth users first

-- For promoted schools:
DO $$
DECLARE
  greenfield_user_id UUID := gen_random_uuid();
  jhbhigh_user_id UUID := gen_random_uuid();
  stellenbosch_user_id UUID := gen_random_uuid();
  pretoria_user_id UUID := gen_random_uuid();
  durban_user_id UUID := gen_random_uuid();
  bloemfontein_user_id UUID := gen_random_uuid();
BEGIN
  -- Create user_profiles (you'll need to create corresponding auth.users entries)
  -- For now, we'll insert with the assumption that auth users exist or will be created
  
  -- Promoted School 1: Greenfield Primary School (Cape Town)
  INSERT INTO user_profiles (id, role, email, full_name, is_verified, created_at, updated_at)
  VALUES (greenfield_user_id, 'school', 'greenfield@example.com', 'Greenfield Primary School', true, now(), now())
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO school_profiles (
    id, school_name, slug, description, address, city, province, postal_code,
    phone, email, cover_image_url, is_verified, is_approved, is_active,
    school_type, grade_range, fees_min, fees_max, fees_currency, matric_pass_rate,
    established_year, created_at, updated_at, approved_at
  ) VALUES (
    greenfield_user_id,
    'Greenfield Primary School',
    'greenfield-primary-school',
    'Greenfield Primary provides quality education in a nurturing environment. Our focus is on developing well-rounded individuals who are prepared for the challenges of high school and beyond. We emphasize academic excellence, character development, and holistic growth.',
    '123 Main Road, Claremont',
    'Cape Town',
    'Western Cape',
    '7708',
    '+27 21 123 4567',
    'info@greenfieldprimary.co.za',
    'https://images.unsplash.com/photo-1503676260728-1c00e094b736?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    true,
    true,
    true,
    'private',
    'primary',
    35000,
    45000,
    'ZAR',
    NULL,
    1985,
    now(),
    now(),
    now()
  ) ON CONFLICT (slug) DO NOTHING;
  
  -- Promoted School 2: Johannesburg High School (Johannesburg)
  INSERT INTO user_profiles (id, role, email, full_name, is_verified, created_at, updated_at)
  VALUES (jhbhigh_user_id, 'school', 'jhbhigh@example.com', 'Johannesburg High School', true, now(), now())
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO school_profiles (
    id, school_name, slug, description, address, city, province, postal_code,
    phone, email, cover_image_url, is_verified, is_approved, is_active,
    school_type, grade_range, fees_min, fees_max, fees_currency, matric_pass_rate,
    established_year, created_at, updated_at, approved_at
  ) VALUES (
    jhbhigh_user_id,
    'Johannesburg High School',
    'johannesburg-high-school',
    'Excellence in education for over 50 years. We prepare learners for university and beyond with a strong academic foundation, comprehensive sports programs, and a commitment to developing future leaders. Our boarding facilities provide a supportive home-away-from-home environment.',
    '456 Rivonia Road, Sandton',
    'Johannesburg',
    'Gauteng',
    '2196',
    '+27 11 234 5678',
    'admissions@jhbhigh.co.za',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    true,
    true,
    true,
    'private',
    'high_school',
    65000,
    85000,
    'ZAR',
    98,
    1970,
    now(),
    now(),
    now()
  ) ON CONFLICT (slug) DO NOTHING;
  
  -- Promoted School 3: Stellenbosch Combined School (Stellenbosch)
  INSERT INTO user_profiles (id, role, email, full_name, is_verified, created_at, updated_at)
  VALUES (stellenbosch_user_id, 'school', 'stellenbosch@example.com', 'Stellenbosch Combined School', true, now(), now())
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO school_profiles (
    id, school_name, slug, description, address, city, province, postal_code,
    phone, email, cover_image_url, is_verified, is_approved, is_active,
    school_type, grade_range, fees_min, fees_max, fees_currency, matric_pass_rate,
    established_year, created_at, updated_at, approved_at
  ) VALUES (
    stellenbosch_user_id,
    'Stellenbosch Combined School',
    'stellenbosch-combined-school',
    'Grades 1-12 in one campus. Strong academic tradition with a focus on bilingual education (English/Afrikaans). We provide a comprehensive curriculum that prepares students for tertiary education while maintaining our rich cultural heritage.',
    '789 Church Street, Stellenbosch Central',
    'Stellenbosch',
    'Western Cape',
    '7600',
    '+27 21 345 6789',
    'info@stellenboschcombined.co.za',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    true,
    true,
    true,
    'independent',
    'primary',
    45000,
    70000,
    'ZAR',
    95,
    1960,
    now(),
    now(),
    now()
  ) ON CONFLICT (slug) DO NOTHING;
  
  -- Organic School 1: Pretoria Academy (Pretoria)
  INSERT INTO user_profiles (id, role, email, full_name, is_verified, created_at, updated_at)
  VALUES (pretoria_user_id, 'school', 'pretoria@example.com', 'Pretoria Academy', true, now(), now())
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO school_profiles (
    id, school_name, slug, description, address, city, province, postal_code,
    phone, email, cover_image_url, is_verified, is_approved, is_active,
    school_type, grade_range, fees_min, fees_max, fees_currency, matric_pass_rate,
    established_year, created_at, updated_at, approved_at
  ) VALUES (
    pretoria_user_id,
    'Pretoria Academy',
    'pretoria-academy',
    'A leading educational institution in the heart of Pretoria, offering quality education from Grade R to Grade 12. We focus on academic excellence, character building, and preparing students for success in their chosen fields.',
    '321 Arcadia Street, Arcadia',
    'Pretoria',
    'Gauteng',
    '0083',
    '+27 12 456 7890',
    'info@pretoriaacademy.co.za',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    true,
    true,
    true,
    'private',
    'primary',
    40000,
    60000,
    'ZAR',
    92,
    1990,
    now(),
    now(),
    now()
  ) ON CONFLICT (slug) DO NOTHING;
  
  -- Organic School 2: Durban Preparatory School (Durban)
  INSERT INTO user_profiles (id, role, email, full_name, is_verified, created_at, updated_at)
  VALUES (durban_user_id, 'school', 'durban@example.com', 'Durban Preparatory School', true, now(), now())
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO school_profiles (
    id, school_name, slug, description, address, city, province, postal_code,
    phone, email, cover_image_url, is_verified, is_approved, is_active,
    school_type, grade_range, fees_min, fees_max, fees_currency, matric_pass_rate,
    established_year, created_at, updated_at, approved_at
  ) VALUES (
    durban_user_id,
    'Durban Preparatory School',
    'durban-preparatory-school',
    'Nurturing young minds in a vibrant coastal city. We provide a strong foundation in academics, sports, and the arts, ensuring our students are well-prepared for their educational journey ahead.',
    '555 Musgrave Road, Berea',
    'Durban',
    'KwaZulu-Natal',
    '4001',
    '+27 31 567 8901',
    'admissions@durbanprep.co.za',
    'https://images.unsplash.com/photo-1503676260728-1c00e094b736?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    true,
    true,
    true,
    'private',
    'primary',
    38000,
    52000,
    'ZAR',
    NULL,
    2000,
    now(),
    now(),
    now()
  ) ON CONFLICT (slug) DO NOTHING;
  
  -- Organic School 3: Bloemfontein Primary School (Bloemfontein)
  INSERT INTO user_profiles (id, role, email, full_name, is_verified, created_at, updated_at)
  VALUES (bloemfontein_user_id, 'school', 'bloemfontein@example.com', 'Bloemfontein Primary School', true, now(), now())
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO school_profiles (
    id, school_name, slug, description, address, city, province, postal_code,
    phone, email, cover_image_url, is_verified, is_approved, is_active,
    school_type, grade_range, fees_min, fees_max, fees_currency, matric_pass_rate,
    established_year, created_at, updated_at, approved_at
  ) VALUES (
    bloemfontein_user_id,
    'Bloemfontein Primary School',
    'bloemfontein-primary-school',
    'Committed to providing quality primary education in the Free State. Our dedicated teachers and comprehensive curriculum ensure that every child reaches their full potential in a supportive and caring environment.',
    '789 President Brand Street, Bloemfontein',
    'Bloemfontein',
    'Free State',
    '9301',
    '+27 51 678 9012',
    'info@bloemfonteinprimary.co.za',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    true,
    true,
    true,
    'public',
    'primary',
    15000,
    25000,
    'ZAR',
    NULL,
    1988,
    now(),
    now(),
    now()
  ) ON CONFLICT (slug) DO NOTHING;
  
  -- Add sports for all schools
  -- Greenfield Primary
  INSERT INTO school_sports (school_id, sport_name, level, created_at)
  SELECT greenfield_user_id, sport, 'competitive', now()
  FROM unnest(ARRAY['Rugby', 'Cricket', 'Soccer', 'Swimming', 'Athletics', 'Netball']) AS sport;
  
  -- Johannesburg High
  INSERT INTO school_sports (school_id, sport_name, level, created_at)
  SELECT jhbhigh_user_id, sport, 'competitive', now()
  FROM unnest(ARRAY['Rugby', 'Cricket', 'Hockey', 'Swimming', 'Athletics', 'Tennis', 'Soccer']) AS sport;
  
  -- Stellenbosch Combined
  INSERT INTO school_sports (school_id, sport_name, level, created_at)
  SELECT stellenbosch_user_id, sport, 'competitive', now()
  FROM unnest(ARRAY['Rugby', 'Cricket', 'Hockey', 'Swimming', 'Athletics', 'Tennis', 'Soccer', 'Basketball', 'Volleyball', 'Water Polo']) AS sport;
  
  -- Pretoria Academy
  INSERT INTO school_sports (school_id, sport_name, level, created_at)
  SELECT pretoria_user_id, sport, 'competitive', now()
  FROM unnest(ARRAY['Rugby', 'Cricket', 'Soccer', 'Swimming', 'Athletics', 'Netball', 'Tennis']) AS sport;
  
  -- Durban Preparatory
  INSERT INTO school_sports (school_id, sport_name, level, created_at)
  SELECT durban_user_id, sport, 'competitive', now()
  FROM unnest(ARRAY['Rugby', 'Cricket', 'Soccer', 'Swimming', 'Athletics', 'Netball']) AS sport;
  
  -- Bloemfontein Primary
  INSERT INTO school_sports (school_id, sport_name, level, created_at)
  SELECT bloemfontein_user_id, sport, 'competitive', now()
  FROM unnest(ARRAY['Rugby', 'Cricket', 'Soccer', 'Athletics', 'Netball']) AS sport;
  
  -- Add activities (subjects) for all schools
  -- Greenfield Primary
  INSERT INTO school_activities (school_id, activity_name, category, created_at)
  SELECT greenfield_user_id, subject, 'academic', now()
  FROM unnest(ARRAY['Mathematics', 'English', 'Afrikaans', 'Natural Sciences', 'Social Sciences', 'Life Skills']) AS subject;
  
  -- Johannesburg High
  INSERT INTO school_activities (school_id, activity_name, category, created_at)
  SELECT jhbhigh_user_id, subject, 'academic', now()
  FROM unnest(ARRAY['Mathematics', 'English', 'Afrikaans', 'Physical Science', 'Life Sciences', 'History', 'Geography', 'Accounting', 'Business Studies', 'Economics']) AS subject;
  
  -- Stellenbosch Combined
  INSERT INTO school_activities (school_id, activity_name, category, created_at)
  SELECT stellenbosch_user_id, subject, 'academic', now()
  FROM unnest(ARRAY['Mathematics', 'Physical Science', 'Life Sciences', 'English', 'Afrikaans', 'History', 'Geography', 'Accounting', 'Business Studies', 'Economics', 'Computer Science', 'Art']) AS subject;
  
  -- Pretoria Academy
  INSERT INTO school_activities (school_id, activity_name, category, created_at)
  SELECT pretoria_user_id, subject, 'academic', now()
  FROM unnest(ARRAY['Mathematics', 'English', 'Afrikaans', 'Natural Sciences', 'Social Sciences', 'Life Skills', 'Technology']) AS subject;
  
  -- Durban Preparatory
  INSERT INTO school_activities (school_id, activity_name, category, created_at)
  SELECT durban_user_id, subject, 'academic', now()
  FROM unnest(ARRAY['Mathematics', 'English', 'Zulu', 'Natural Sciences', 'Social Sciences', 'Life Skills']) AS subject;
  
  -- Bloemfontein Primary
  INSERT INTO school_activities (school_id, activity_name, category, created_at)
  SELECT bloemfontein_user_id, subject, 'academic', now()
  FROM unnest(ARRAY['Mathematics', 'English', 'Afrikaans', 'Natural Sciences', 'Social Sciences', 'Life Skills']) AS subject;
  
  -- Create promotions for the 3 promoted schools
  INSERT INTO promotions (school_id, promotion_type, start_date, end_date, is_active, created_at, updated_at)
  VALUES
    (greenfield_user_id, 'featured', now(), now() + interval '30 days', true, now(), now()),
    (jhbhigh_user_id, 'featured', now(), now() + interval '30 days', true, now(), now()),
    (stellenbosch_user_id, 'boost', now(), now() + interval '30 days', true, now(), now());
    
END $$;
