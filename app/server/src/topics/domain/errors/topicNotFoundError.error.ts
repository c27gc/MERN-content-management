export class TopicNotFoundError extends Error {
  constructor() {
    super('Topic not found');
    this.name = 'TopicNotFoundError';
  }
}
