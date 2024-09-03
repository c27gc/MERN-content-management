import { ITopicRepository } from '../../domain/interfaces/topic.repository.interface';
import { Topic } from '../../domain/entities/topic.entity';

export class GetTopicUseCase {
  constructor(private readonly topicRepository: ITopicRepository) {}

  async execute(id: string): Promise<Topic | null> {
    return await this.topicRepository.findById(id);
  }

  async getAll(): Promise<Topic[]> {
    return await this.topicRepository.findAll();
  }

  async search(term: string): Promise<Topic[]> {
    return await this.topicRepository.search(term);
  }
}
