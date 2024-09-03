import { Topic } from '../entities/topic.entity';

export interface ITopicRepository {
  findById(id: string): Promise<Topic | null>;
  findByName(name: string): Promise<Topic | null>;
  findAll(): Promise<Topic[]>;
  search(term: string): Promise<Topic[]>; 
  save(topic: Topic): Promise<Topic>;
  delete(id: string): Promise<void>;
}
