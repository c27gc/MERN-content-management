import { ITopicRepository } from '../../domain/interfaces/topic.repository.interface';
import { Topic } from '../../domain/entities/topic.entity';
import { TopicNotFoundError } from '../../domain/errors/topicNotFoundError.error';

export class UpdateTopicUseCase {
  constructor(private topicRepository: ITopicRepository) {}

  async execute(id: string, updateData: Partial<Topic>): Promise<Topic> {
    const topic = await this.topicRepository.findById(id);
    if (!topic) {
      throw new TopicNotFoundError();
    }

    Object.assign(topic, updateData);
    topic.updatedAt = new Date();  // Actualizamos la fecha de actualización
    return await this.topicRepository.save(topic);
  }
}
