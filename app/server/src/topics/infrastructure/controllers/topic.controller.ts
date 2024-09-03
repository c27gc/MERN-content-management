import { Request, Response } from 'express';
import { CreateTopicUseCase } from '../../application/usecases/createTopic.usecase';
import { GetTopicUseCase } from '../../application/usecases/getTopic.usecase';
import { UpdateTopicUseCase } from '../../application/usecases/updateTopic.usecase';
import { DeleteTopicUseCase } from '../../application/usecases/deleteTopic.usecase';

export class TopicController {
  constructor(
    private createTopicUseCase: CreateTopicUseCase,
    private getTopicUseCase: GetTopicUseCase,
    private updateTopicUseCase: UpdateTopicUseCase,
    private deleteTopicUseCase: DeleteTopicUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    console.log('req.user:', req.user);
    if (!req.user || !['Admin'].includes(req.user.role)) {
      res.status(403).json({ message: req ? 'Access denied' : 'Unauthorized' });
      return;
    }

    try {
      const { name, description, coverImage, allowedContentTypes } = req.body;
      const createdBy = req.user._id as string;
      const topic = await this.createTopicUseCase.execute(name, description, coverImage, allowedContentTypes, createdBy);
      res.status(201).json(topic);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const topic = await this.getTopicUseCase.execute(req.params.id);
      if (!topic) {
        res.status(404).json({ message: 'Topic not found' });
        return;
      }
      res.status(200).json(topic);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const topics = await this.getTopicUseCase.getAll();
      res.status(200).json(topics);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async search(req: Request, res: Response): Promise<void> {
    try {
      const { term } = req.query; 
      const topics = await this.getTopicUseCase.search(term as string);
      res.status(200).json(topics);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: error });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    if (!req.user || !['Admin'].includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    try {
      const updatedTopic = await this.updateTopicUseCase.execute(req.params.id, req.body);
      res.status(200).json(updatedTopic);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    if (!req.user || !['Admin'].includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    try {
      await this.deleteTopicUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }
}
