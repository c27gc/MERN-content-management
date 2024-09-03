import { ICategoryRepository } from '../../domain/interfaces/category.repository.interface';
import { Category } from '../../domain/entities/category.entity';

export class GetCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<Category | null> {
    return await this.categoryRepository.findById(id);
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async search(term: string): Promise<Category[]> {
    return await this.categoryRepository.search(term);
  }
}
