import { ICategoryRepository } from '../../domain/interfaces/category.repository.interface';
import { Category } from '../../domain/entities/category.entity';


export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(name: string, description: string, createdBy: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByName(name);
    if (existingCategory) {
      throw new Error('Category already exists');
    }

    const category = new Category(name, description, createdBy);
    return await this.categoryRepository.save(category);
  }
}
