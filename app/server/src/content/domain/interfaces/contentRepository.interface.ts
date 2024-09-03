import { Content } from '../../domain/entities/content.entity';

export interface IContentRepository {
  create(content: Content): Promise<Content>;
  findById(id: string): Promise<Content | null>;
  findByTopicId(topicId: string): Promise<Content[]>;
  findByCategoryId(categoryId: string): Promise<Content[]>;
  search(term: string): Promise<Content[]>;
  delete(id: string): Promise<void>;
}