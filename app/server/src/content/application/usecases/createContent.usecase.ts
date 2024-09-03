
import { IContentRepository } from '../../domain/interfaces/contentRepository.interface';
import { Content } from '../../domain/entities/content.entity';

export class CreateContentUseCase {
  constructor(private contentRepository: IContentRepository) {}

  async execute(
    title: string,
    description: string,
    contentType: "video" | "image" | "text",
    contentUrl: string,
    textContent: string,
    category: string,
    topic: string,
    createdBy: string
  ): Promise<Content> {
    const content = new Content(
      '',
      title,
      description,
      contentType,
      contentUrl,
      textContent,
      category,
      topic,
      createdBy,
      new Date(),
      new Date()
    );
    return this.contentRepository.create(content);
  }
}