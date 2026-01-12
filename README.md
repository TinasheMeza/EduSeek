# EduSeek - School Discovery Platform

A full-featured, production-grade school discovery platform built with Next.js 14, TypeScript, and Supabase. Similar to AutoTrader, Property24, Zillow, and Airbnb, but for schools.

**EduSeek** is a South Africa-based platform helping parents discover and compare schools.

## 🚀 Features

### For Parents
- **Smart Search**: Find schools by location, fees, sports, activities, and more
- **Save & Compare**: Save favorite schools and compare up to 3 schools side-by-side
- **Saved Searches**: Save search criteria for quick access
- **Inquiries**: Contact schools directly through the platform
- **Notifications**: Stay updated on school updates and responses

### For Schools
- **Profile Management**: Create and manage comprehensive school profiles
- **Image Galleries**: Upload and organize school images
- **Analytics Dashboard**: Track profile views, clicks, and inquiries
- **Promotions**: Boost listings with featured placements
- **Event Management**: Create and manage school events

### For Admins
- **School Approval**: Review and approve school profiles
- **Content Moderation**: Moderate user-generated content
- **Ad Management**: Create and manage advertisements in search feed
- **Platform Metrics**: View platform-wide analytics

### For Super Admins
- **Full Analytics**: Complete platform visibility
- **User Management**: Manage all users and roles
- **Admin Management**: Promote/demote administrators
- **Platform Configuration**: Configure platform settings

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth with Row-Level Security (RLS)

### Database Schema

#### Core Tables
- `user_profiles`: User accounts with role-based access
- `parent_profiles`: Parent-specific data and preferences
- `school_profiles`: School information and details
- `school_images`: School image galleries
- `school_sports`: Sports offered by schools
- `school_activities`: Extracurricular activities
- `school_events`: Upcoming school events
- `school_achievements`: School achievements and awards

#### User Interaction Tables
- `saved_searches`: Parent saved search criteria
- `favorite_schools`: Parent favorite schools
- `school_comparisons`: School comparison lists (max 3)
- `inquiries`: Contact form submissions
- `notifications`: User notifications

#### Business Tables
- `analytics_events`: Platform analytics tracking
- `promotions`: School promotion campaigns
- `payments`: Payment transactions
- `ads`: Advertisement placements
- `audit_logs`: Admin action audit trail

### Security

#### Row-Level Security (RLS)
All tables have comprehensive RLS policies:
- **Public Access**: Approved schools visible to all
- **User Access**: Users can only access their own data
- **School Access**: Schools can manage their own profiles
- **Admin Access**: Admins can view and moderate content
- **Super Admin**: Full read-only access across platform

#### Authentication Flow
1. User signs up with email/password
2. Role is assigned (parent, school, admin, super_admin)
3. Role-specific profile is created
4. Middleware enforces route protection
5. RLS policies enforce data access

### File Structure

```
├── app/
│   ├── auth/              # Authentication pages
│   ├── parent/            # Parent dashboard
│   ├── school/            # School dashboard
│   ├── admin/             # Admin dashboard
│   ├── super-admin/       # Super admin dashboard
│   ├── search/            # Search page
│   ├── schools/           # School profile pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Layout components (Navbar, Footer)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── supabase/         # Supabase client setup
│   ├── auth.ts            # Authentication utilities
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
└── middleware.ts          # Route protection middleware
```

## 🔐 User Roles

### Parent
- Default role for parents searching for schools
- Can search, save, compare, and contact schools
- Access: `/parent/*`

### School
- Role for school administrators
- Can manage school profile, upload images, view analytics
- Access: `/school/*`

### Admin
- Platform moderators
- Can approve schools, moderate content, manage ads
- Access: `/admin/*`

### Super Admin
- Platform owner
- Full read-only access, can manage admins
- Access: `/super-admin/*`

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Environment variables configured

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd eduseek-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migrations
The database schema is already set up via Supabase migrations. All tables, RLS policies, and triggers are configured.

5. Start development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📝 Key Features Implementation

### Search System
- Location-based search with radius filtering
- Multiple filter options (type, fees, sports, activities)
- Sorting options (relevance, distance, fees, name)
- Pagination for performance
- Ad injection every 4 listings (to be implemented)

### Analytics
- Event tracking for profile views, searches, clicks
- School-specific analytics dashboard
- Platform-wide metrics for admins
- 30-day rolling metrics

### Payments (To Be Implemented)
- Integration with Stripe, Payfast, PayGate
- Promotion purchase flow
- Payment history tracking
- Revenue analytics

### Security Features
- ✅ RLS policies on all tables
- ✅ Route protection via middleware
- ✅ Role-based access control
- ⏳ Rate limiting (to be implemented)
- ⏳ Input validation (to be enhanced)
- ⏳ Secure file uploads (to be implemented)
- ✅ Audit logs for admin actions

## 🎨 Design System

- **Colors**: Blue primary (#2563EB), Gray neutrals
- **Typography**: System fonts (Arial, Helvetica, sans-serif)
- **Components**: Card-based layout, modern and clean
- **Responsive**: Mobile-first design

## 📊 Database Indexes

Optimized indexes for:
- User roles and email lookups
- School location searches (GIST index)
- School approval status
- Analytics event types
- Foreign key relationships

## 🔄 Next Steps

### Payment Integration
- [ ] Stripe integration
- [ ] Payfast integration
- [ ] PayGate integration
- [ ] Payment webhook handlers

### Enhanced Features
- [ ] Map integration (Google Maps/Mapbox)
- [ ] Image optimization and CDN
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced search with geolocation
- [ ] School comparison tool UI
- [ ] Rate limiting middleware
- [ ] File upload with Supabase Storage
- [ ] SEO optimization
- [ ] Performance monitoring

### Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Security audits

## 📄 License

Private - All rights reserved

## 🤝 Support

For issues and questions, please contact:
- **Support Email**: support@eduseek.co.za
- **Contact Email**: contact@eduseek.co.za

**Note**: All EduSeek system email addresses use the .co.za domain (South Africa).

---

Built with ❤️ using Next.js and Supabase
