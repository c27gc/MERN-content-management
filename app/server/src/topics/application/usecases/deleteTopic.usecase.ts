import { ITopicRepository } from '../../domain/interfaces/topic.repository.interface';
import { TopicNotFoundError } from '../../domain/errors/topicNotFoundError.error';

export class DeleteTopicUseCase {
  constructor(private topicRepository: ITopicRepository) {}

  async execute(id: string): Promise<void> {
    const topic = await this.topicRepository.findById(id);
    if (!topic) {
      throw new TopicNotFoundError();
    }

    await this.topicRepository.delete(id);
  }
}