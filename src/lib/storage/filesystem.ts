import { isTauri } from '$lib/config/tauri';

export async function saveFile(
  path: string,
  data: Uint8Array
) {
  if (!isTauri) {
    throw new Error('Filesystem access requires Tauri');
  }

  const { writeFile } = await import('@tauri-apps/plugin-fs');

  await writeFile(path, data);
}

export async function loadFile(path: string): Promise<Uint8Array> {
  if (!isTauri) {
    throw new Error('Filesystem access requires Tauri');
  }

  const { readFile } = await import('@tauri-apps/plugin-fs');

  return await readFile(path);
}
