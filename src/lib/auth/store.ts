import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  department: string;
}

const storedUser = browser
  ? JSON.parse(localStorage.getItem('currentUser') ?? 'null')
  : null;

export const currentUser = writable<User | null>(storedUser);

export function login(user: User) {
  currentUser.set(user);
  if (browser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}

export function logout() {
  currentUser.set(null);
  if (browser) {
    localStorage.removeItem('currentUser');
  }
}
