import { Topic } from '../entities/topic.entity';

export interface ITopicService {
  createTopic(
    name: string,
    description: string,
    coverImage: string,
    allowedContentTypes: string[],
    createdBy: string
  ): Promise<Topic>;

  getTopic(id: string): Promise<Topic | null>;

  getAllCategories(filters?: any, sort?: any): Promise<Topic[]>;

  updateTopic(id: string, updateData: Partial<Topic>): Promise<Topic>;

  deleteTopic(id: string): Promise<void>;
}
