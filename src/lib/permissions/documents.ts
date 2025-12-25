import type { User } from '$lib/auth/store';
import type { DocumentMeta } from '$lib/documents/types';

export function canEditDocument(
  user: User | null,
  doc: DocumentMeta
): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.role === 'editor' && user.id === doc.ownerId;
}

export function canDeleteDocument(
  user: User | null,
  doc: DocumentMeta
): boolean {
  return user?.role === 'admin';
}
