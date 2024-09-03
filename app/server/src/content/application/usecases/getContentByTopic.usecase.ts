import { IContentRepository } from '../../domain/interfaces/contentRepository.interface';
import { ICategoryRepository } from '../../../categories/domain/interfaces/category.repository.interface';
import { Content } from '../../domain/entities/content.entity';

interface ContentGroupedByCategory {
  category: string;
  contents: Content[];
  contentCounts: { [key: string]: number };
}

export class GetContentByTopicUseCase {
  constructor(
    private contentRepository: IContentRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(topicId: string): Promise<ContentGroupedByCategory[]> {
    // Obtener todos los contenidos por topicId
    const contents = await this.contentRepository.findByTopicId(topicId);

    // Ordenar por fecha de creación del más reciente al más viejo
    contents.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Agrupar por categoría
    const groupedByCategory: { [key: string]: ContentGroupedByCategory } = {};

    for (const content of contents) {
      const category = await this.categoryRepository.findById(content.category);
      const categoryName = category ? category.name : 'Unknown Category';

      if (!groupedByCategory[categoryName]) {
        groupedByCategory[categoryName] = {
          category: categoryName,
          contents: [],
          contentCounts: { image: 0, video: 0, text: 0 },
        };
      }

      groupedByCategory[categoryName].contents.push(content);
      groupedByCategory[categoryName].contentCounts[content.type] += 1;
    }

    return Object.values(groupedByCategory);
  }
}
