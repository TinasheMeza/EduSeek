# School Data Seeding Instructions

This directory contains scripts to seed the database with 6 schools (3 promoted, 3 organic) across different areas of South Africa.

## Schools to be Created

### Promoted Schools:
1. **Greenfield Primary School** - Claremont, Cape Town, Western Cape
2. **Johannesburg High School** - Sandton, Johannesburg, Gauteng  
3. **Stellenbosch Combined School** - Stellenbosch Central, Stellenbosch, Western Cape

### Organic Schools:
1. **Pretoria Academy** - Arcadia, Pretoria, Gauteng
2. **Durban Preparatory School** - Berea, Durban, KwaZulu-Natal
3. **Bloemfontein Primary School** - Bloemfontein, Free State

## Prerequisites

Before seeding schools, you need to create auth users in Supabase. Each school requires:
1. An auth user (created through Supabase Auth)
2. A corresponding user_profile entry
3. A school_profile entry

## Method 1: Using Supabase Dashboard

1. Go to your Supabase Dashboard → Authentication → Users
2. Create 6 new users with these emails:
   - greenfield@example.com
   - jhbhigh@example.com
   - stellenbosch@example.com
   - pretoria@example.com
   - durban@example.com
   - bloemfontein@example.com
3. Copy the UUIDs of each created user
4. Update the `scripts/seed-schools.sql` file with the actual UUIDs
5. Run the SQL script in the Supabase SQL Editor

## Method 2: Using the TypeScript Seed Script

1. Make sure you have environment variables set:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

2. Install dependencies if needed:
   ```bash
   npm install
   ```

3. Run the seed script:
   ```bash
   npx tsx scripts/seed-schools.ts
   ```

Note: The TypeScript script will attempt to create user_profiles, but you may need to create auth users first through the Supabase dashboard.

## Method 3: Manual Insert via Supabase Dashboard

1. Create auth users first (as in Method 1)
2. For each school, insert into `user_profiles`:
   ```sql
   INSERT INTO user_profiles (id, role, email, full_name, is_verified)
   VALUES ('auth-user-uuid', 'school', 'email@example.com', 'School Name', true);
   ```

3. Then insert into `school_profiles` using the same UUID
4. Add sports and activities
5. Create promotions for the 3 promoted schools

## Data Included

Each school will have:
- Complete profile information (name, address, contact details)
- Cover image URL
- Fee range
- School type and grade range
- Sports (6-10 sports per school)
- Subjects/Activities (6-12 subjects per school)
- Promotions (for the 3 promoted schools)

## Verification

After seeding, verify the data:

```sql
-- Check schools
SELECT school_name, city, province, is_approved FROM school_profiles;

-- Check promotions
SELECT sp.school_name, p.promotion_type, p.is_active 
FROM promotions p
JOIN school_profiles sp ON p.school_id = sp.id;

-- Check sports
SELECT sp.school_name, COUNT(ss.id) as sport_count
FROM school_profiles sp
LEFT JOIN school_sports ss ON sp.id = ss.school_id
GROUP BY sp.school_name;
```

## Troubleshooting

### Foreign Key Constraint Errors
- Ensure auth users are created before inserting into user_profiles
- Make sure the UUIDs match between auth.users and user_profiles

### Duplicate Key Errors
- Schools may already exist - check the database first
- Use `ON CONFLICT DO NOTHING` or update existing records

### Missing Data
- Verify all required fields are provided
- Check that is_approved and is_active are set to true for schools to appear in search
