// src/domain/interfaces/content.interface.ts
export interface IContent {
  id: string;
  title: string;
  description: string;
  contentType: string;
  contentUrl: string;
  textContent?: string;
  categoryId: string;
  topicId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
