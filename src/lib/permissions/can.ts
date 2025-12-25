import type { AuthUser } from '$lib/auth/store';

export function can(
  user: AuthUser | null,
   _permission: string
): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return false;
}
