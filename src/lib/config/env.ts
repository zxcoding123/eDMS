export const IS_TAURI = '__TAURI__' in window;

export const API_BASE_URL = IS_TAURI
  ? 'http://192.168.1.10:8000'
  : 'http://localhost:8000';
