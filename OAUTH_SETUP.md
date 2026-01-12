# OAuth Setup Guide

To enable Google and Microsoft sign-in, you need to configure OAuth providers in your Supabase dashboard.

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `https://your-project-ref.supabase.co/auth/v1/callback`
6. Copy the Client ID and Client Secret
7. In Supabase Dashboard → Authentication → Providers → Google:
   - Enable Google provider
   - Paste Client ID and Client Secret
   - Save

## Microsoft (Azure) OAuth Setup

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory → App registrations
3. Create a new registration
4. Add redirect URI: `https://your-project-ref.supabase.co/auth/v1/callback`
5. Copy the Application (client) ID and create a client secret
6. In Supabase Dashboard → Authentication → Providers → Azure:
   - Enable Azure provider
   - Paste Application ID and Client Secret
   - Set Tenant ID (usually "common" for multi-tenant)
   - Save

## Testing

After configuration, users can sign in/sign up using:
- Google button on login/signup pages
- Microsoft button on login/signup pages

The OAuth flow will redirect to `/auth/callback` which handles the authentication and redirects to the appropriate dashboard.
