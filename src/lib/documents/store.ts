import { writable } from 'svelte/store';
import type { DocumentMeta } from './types';
import { browser } from '$app/environment';
import { browserStorage } from '$lib/storage/browser';

const STORAGE_KEY = 'documents';

const initialDocs: DocumentMeta[] = browser
  ? (await browserStorage.get<DocumentMeta[]>(STORAGE_KEY)) ?? []
  : [];

export const documents = writable<DocumentMeta[]>(initialDocs);

documents.subscribe(async (value) => {
  if (browser) {
    await browserStorage.set(STORAGE_KEY, value);
  }
});

export function addDocument(doc: DocumentMeta) {
  documents.update((docs) => [...docs, doc]);
}

export function updateDocument(id: string, partial: Partial<DocumentMeta>) {
  documents.update((docs) =>
    docs.map((d) => (d.id === id ? { ...d, ...partial } : d))
  );
}

export function removeDocument(id: string) {
  documents.update((docs) =>
    docs.map((d) =>
      d.id === id ? { ...d, status: 'deleted' } : d
    )
  );
}
