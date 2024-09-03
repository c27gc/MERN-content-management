import { ITopicRepository } from '../../domain/interfaces/topic.repository.interface';
import { Topic } from '../../domain/entities/topic.entity';
import { TopicAlreadyExistsError } from '../../domain/errors/topicAlreadyExists.error';
import { ObjectId } from 'mongoose';

export class CreateTopicUseCase {
  constructor(private topicRepository: ITopicRepository) {}

  async execute(
    name: string,
    description: string,
    coverImage: string,
    allowedContentTypes: string[],
    createdBy: string
  ): Promise<Topic> {
    const existingTopic = await this.topicRepository.findByName(name);
    if (existingTopic) {
      throw new TopicAlreadyExistsError();
    }

    const topic = new Topic(name, description, coverImage, allowedContentTypes, createdBy);
    return await this.topicRepository.save(topic);
  }
}
