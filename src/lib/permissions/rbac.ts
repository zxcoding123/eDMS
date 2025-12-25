// src/lib/permissions/rbac.ts
import type { User } from '$lib/auth/store';

export function canRead(user: User | null): boolean {
  return !!user;
}

export function canWrite(user: User | null): boolean {
  return user?.role === 'admin' || user?.role === 'editor';
}

export function canAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}
