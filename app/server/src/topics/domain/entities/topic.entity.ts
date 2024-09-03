import { ObjectId } from 'mongoose';

export class Topic {
  constructor(
    public name: string,
    public description: string,
    public coverImage: string,
    public allowedContentTypes: string[],
    public createdBy: string, 
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = this.updatedAt || new Date();
  }
}