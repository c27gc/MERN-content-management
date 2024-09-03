import { Request, Response } from 'express';
import { CreateCategoryUseCase } from '../../application/usecases/createCategory.usecase';
import { GetCategoryUseCase } from '../../application/usecases/getCategory.usecase';

export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private getCategoryUseCase: GetCategoryUseCase,

  ) {}

  async create(req: Request, res: Response): Promise<void> {
    console.log('req.user:', req.user);
    if (!req.user || !['Admin'].includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    try {
      const { name, description } = req.body;
      const createdBy = req.user._id as string;
      const category = await this.createCategoryUseCase.execute(name, description, createdBy);
      res.status(201).json(category);
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
      const category = await this.getCategoryUseCase.execute(req.params.id);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.status(200).json(category);
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
      const categories = await this.getCategoryUseCase.getAll();
      res.status(200).json(categories);
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
      const categories = await this.getCategoryUseCase.search(term as string);
      res.status(200).json(categories);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: error });
      }
    }
  }


}
