# EduSeek Platform Architecture

## System Overview

EduSeek is a full-stack school discovery platform built with a modern, scalable architecture. The system is designed to handle multiple user roles, complex search requirements, and high-performance data operations. EduSeek is a South Africa-based platform.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Frontend                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │   App    │  │  Pages  │  │Components│  │Middleware ││
│  │  Router  │  │         │  │          │  │           ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ HTTPS/REST
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  Supabase Backend                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │   Auth   │  │PostgreSQL │  │ Storage  │  │ Realtime ││
│  │          │  │   + RLS   │  │          │  │          ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
└──────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow
1. User submits credentials → Next.js API
2. Next.js → Supabase Auth
3. Supabase Auth → JWT token
4. Token stored in HTTP-only cookies
5. Middleware validates token on each request
6. RLS policies enforce data access

### Search Flow
1. User enters search criteria
2. Frontend → Supabase query with filters
3. PostgreSQL executes query with RLS
4. Results returned to frontend
5. Results displayed with pagination
6. Analytics event logged

### School Profile Flow
1. User visits `/schools/[slug]`
2. Server fetches school data (SSR)
3. Profile view analytics event logged
4. Page rendered with school data
5. User can favorite, compare, or contact

## Database Design

### Entity Relationship Diagram

```
user_profiles (1) ──┬── (1) parent_profiles
                    │
                    ├── (1) school_profiles
                    │
                    └── (1) [role-based access]

school_profiles (1) ──┬── (*) school_images
                     ├── (*) school_sports
                     ├── (*) school_activities
                     ├── (*) school_events
                     ├── (*) school_achievements
                     ├── (*) favorite_schools
                     ├── (*) inquiries
                     ├── (*) promotions
                     └── (*) analytics_events

parent_profiles (1) ──┬── (*) saved_searches
                      ├── (*) favorite_schools
                      ├── (*) school_comparisons
                      └── (*) inquiries
```

### Key Design Decisions

1. **Separate Profile Tables**: Parent and school profiles are separate to allow different data structures and RLS policies
2. **Slug-based URLs**: Schools use slugs for SEO-friendly URLs
3. **JSONB for Flexibility**: Metadata fields use JSONB for extensibility
4. **Event Sourcing**: Analytics events are stored separately for flexible querying
5. **Soft Deletes**: Schools use `is_active` flag instead of hard deletes

## Security Architecture

### Multi-Layer Security

1. **Network Layer**: HTTPS only
2. **Authentication Layer**: Supabase Auth with JWT
3. **Authorization Layer**: Middleware + RLS policies
4. **Data Layer**: Row-Level Security on all tables
5. **Application Layer**: Input validation and sanitization

### RLS Policy Strategy

```sql
-- Example: School profiles
-- Public can view approved schools
CREATE POLICY "Public can view approved schools"
  ON school_profiles FOR SELECT
  USING (is_approved = TRUE AND is_active = TRUE);

-- Schools can manage their own profile
CREATE POLICY "Schools can manage own profile"
  ON school_profiles FOR ALL
  USING (auth.uid() = id);

-- Admins can view all schools
CREATE POLICY "Admins can view all schools"
  ON school_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );
```

## Performance Optimization

### Database Optimizations
- **Indexes**: Strategic indexes on frequently queried columns
- **GIST Index**: Spatial index for location-based searches
- **Partial Indexes**: Indexes on filtered queries (e.g., `is_approved = TRUE`)
- **Connection Pooling**: Supabase handles connection pooling

### Frontend Optimizations
- **Server-Side Rendering**: School profiles rendered on server
- **Static Generation**: Home page and static content
- **Image Optimization**: Next.js Image component (to be implemented)
- **Code Splitting**: Automatic with Next.js App Router
- **Caching**: Browser caching for static assets

### Search Optimization
- **Pagination**: Limit results per page (12 items)
- **Filtered Queries**: Database-level filtering
- **Lazy Loading**: Load more results on scroll (to be implemented)
- **Debouncing**: Search input debouncing (to be implemented)

## Scalability Considerations

### Horizontal Scaling
- **Stateless Frontend**: Next.js can scale horizontally
- **Database**: Supabase PostgreSQL can scale
- **CDN**: Static assets served via CDN (Vercel)

### Vertical Scaling
- **Database**: Supabase handles database scaling
- **Compute**: Vercel/serverless handles compute scaling

### Caching Strategy
- **Browser Cache**: Static assets
- **CDN Cache**: Images and static content
- **Database Query Cache**: Supabase query caching
- **Application Cache**: React Query/SWR (to be implemented)

## Monitoring & Analytics

### Application Monitoring
- **Error Tracking**: To be implemented (Sentry)
- **Performance Monitoring**: To be implemented (Vercel Analytics)
- **User Analytics**: Custom analytics events table

### Business Analytics
- **User Metrics**: Total users, growth, retention
- **Search Metrics**: Search volume, popular filters
- **School Metrics**: Profile views, inquiries, conversions
- **Revenue Metrics**: Payments, promotions, revenue

## Deployment Architecture

### Production Stack
- **Frontend**: Vercel (Next.js)
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **CDN**: Vercel Edge Network
- **Domain**: Custom domain with SSL

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=production_anon_key
```

### CI/CD Pipeline
- **Git**: Version control
- **Vercel**: Automatic deployments on push
- **Database Migrations**: Supabase migration system

## Future Enhancements

### Technical
- [ ] GraphQL API layer
- [ ] Redis caching layer
- [ ] Elasticsearch for advanced search
- [ ] WebSocket for real-time updates
- [ ] Microservices architecture (if needed)

### Features
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] AI-powered school recommendations
- [ ] Virtual school tours
- [ ] Parent reviews and ratings
- [ ] School application management

## API Design

### RESTful Endpoints (via Supabase)

All data access goes through Supabase's auto-generated REST API:

```
GET    /rest/v1/school_profiles?select=*&is_approved=eq.true
POST   /rest/v1/inquiries
GET    /rest/v1/analytics_events?school_id=eq.{id}
```

### Custom API Routes (Next.js)

```
/api/auth/callback        # Auth callback handler
/api/webhooks/stripe     # Payment webhooks (to be implemented)
/api/webhooks/payfast    # Payment webhooks (to be implemented)
```

## Error Handling

### Error Types
1. **Authentication Errors**: Redirect to login
2. **Authorization Errors**: Show access denied
3. **Validation Errors**: Show form errors
4. **Network Errors**: Retry with exponential backoff
5. **Server Errors**: Show generic error message

### Error Logging
- Client errors: Console + error boundary
- Server errors: Server logs + error tracking (to be implemented)
- Database errors: Supabase logs

## Testing Strategy

### Unit Tests
- Utility functions
- Component rendering
- Form validation

### Integration Tests
- API endpoints
- Database queries
- Authentication flows

### E2E Tests
- User registration
- School search
- Profile management
- Payment flows

## Documentation

- **README.md**: Setup and overview
- **ARCHITECTURE.md**: This file
- **API.md**: API documentation (to be created)
- **DEPLOYMENT.md**: Deployment guide (to be created)

---

This architecture is designed to be scalable, secure, and maintainable. As the platform grows, components can be refactored and optimized without major architectural changes.
