export class Content {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public type: 'image' | 'video' | 'text', 
    public url: string, 
    public category: string, 
    public topic: string, 
    public createdBy: string, 
    public credits: string, 
    public createdAt: Date, 
    public updatedAt: Date 
  ) {}
}