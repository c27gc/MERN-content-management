import { Document, ObjectId } from 'mongoose';

export interface ICategory extends Document {
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}