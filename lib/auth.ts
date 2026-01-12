import { createClient } from './supabase/server'
import { UserRole } from './types'

export async function getCurrentUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile ? { ...user, profile } : null
}

export async function getUserRole(): Promise<UserRole | null> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return (profile?.role as UserRole) || null
}

export async function requireAuth(requiredRole?: UserRole) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  if (user.profile.is_suspended) {
    throw new Error('Account suspended')
  }

  if (requiredRole) {
    const userRole = user.profile.role as UserRole
    const roleHierarchy: Record<UserRole, number> = {
      parent: 1,
      school: 1,
      admin: 2,
      super_admin: 3,
    }

    if (roleHierarchy[userRole] < roleHierarchy[requiredRole]) {
      throw new Error('Insufficient permissions')
    }
  }

  return user
}
