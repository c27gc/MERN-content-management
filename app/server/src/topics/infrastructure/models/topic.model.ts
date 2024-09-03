import { Schema, model, Document } from 'mongoose';

interface ITopic extends Document {
  name: string;
  description: string;
  coverImage: string;
  allowedContentTypes: string[];
  createdBy: string;  // Cambiado a string
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new Schema<ITopic>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  coverImage: { type: String, required: true },
  allowedContentTypes: { type: [String], required: true },
  createdBy: { type: String, ref: 'User', required: true }, // Cambiado a string
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const TopicModel = model<ITopic>('topic', TopicSchema);

export default TopicModel;
