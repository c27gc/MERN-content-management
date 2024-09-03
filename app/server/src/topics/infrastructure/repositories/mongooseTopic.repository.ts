import { ITopicRepository } from '../../domain/interfaces/topic.repository.interface';
import { Topic } from '../../domain/entities/topic.entity';
import TopicModel from '../models/topic.model';

export class MongooseTopicRepository implements ITopicRepository {
  async findById(id: string): Promise<Topic | null> {
    return await TopicModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Topic | null> {
    return await TopicModel.findOne({ name }).exec();
  }

  async findAll(): Promise<Topic[]> {
    return await TopicModel.find().exec(); // Esto devuelve todas las categorías
  }

  async search(term: string): Promise<Topic[]> {
    return await TopicModel.find({
      name: { $regex: term, $options: 'i' } // Buscar por nombre de categoría usando regex para coincidencias parciales y case-insensitive
    }).exec();
  }

  async save(topic: Topic): Promise<Topic> {
    const newTopic = new TopicModel(topic);
    return await newTopic.save();
  }

  async delete(id: string): Promise<void> {
    await TopicModel.findByIdAndDelete(id).exec();
  }
}
