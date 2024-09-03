import { ICategoryRepository } from '../../domain/interfaces/category.repository.interface';
import { Category } from '../../domain/entities/category.entity';
import CategoryModel from '../models/category.model';

export class MongooseCategoryRepository implements ICategoryRepository {

  async findById(id: string): Promise<Category | null> {
    const mongooseCategory = await CategoryModel.findById(id).exec();
    if (!mongooseCategory) {
      return null;
    }
    return this.mapToEntity(mongooseCategory);
  }

  async findByName(name: string): Promise<Category | null> {
    const mongooseCategory = await CategoryModel.findOne({ name }).exec();
    if (!mongooseCategory) {
      return null;
    }
    return this.mapToEntity(mongooseCategory);
  }

  async findAll(): Promise<Category[]> {
    const mongooseCategories = await CategoryModel.find().exec();
    return mongooseCategories.map(this.mapToEntity);
  }

  async search(term: string): Promise<Category[]> {
    const mongooseCategories = await CategoryModel.find({
      name: { $regex: term, $options: 'i' } // Buscar por nombre usando regex para coincidencias parciales y case-insensitive
    }).exec();
    return mongooseCategories.map(this.mapToEntity);
  }

  async save(category: Category): Promise<Category> {
    const mongooseCategory = new CategoryModel(category);
    await mongooseCategory.save();
    return this.mapToEntity(mongooseCategory);
  }

  async delete(id: string): Promise<void> {
    await CategoryModel.findByIdAndDelete(id).exec();
  }

  private mapToEntity(mongooseCategory: any): Category {
    return {
      name: mongooseCategory.name,
      description: mongooseCategory.description,
      createdAt: mongooseCategory.createdAt,
      updatedAt: mongooseCategory.updatedAt,
      createdBy: mongooseCategory.createdBy.toString(),
    };
  }
}
