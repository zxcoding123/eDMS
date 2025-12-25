export type DocumentStatus = 'active' | 'archived' | 'deleted';

export interface DocumentMeta {
  id: string;
  name: string;
  size: number;
  mime: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  status: DocumentStatus;
}
