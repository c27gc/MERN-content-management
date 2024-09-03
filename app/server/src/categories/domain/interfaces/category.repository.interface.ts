import { Category } from '../../domain/entities/category.entity';

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;

  findByName(name: string): Promise<Category | null>;

  findAll(): Promise<Category[]>;

  search(term: string): Promise<Category[]>;

  save(category: Category): Promise<Category>;

  delete(id: string): Promise<void>;
}