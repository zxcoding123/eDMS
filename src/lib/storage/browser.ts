import type { StorageAdapter } from './adapter';

export const browserStorage: StorageAdapter = {
  async get(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  },

  async set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  async remove(key) {
    localStorage.removeItem(key);
  }
};
