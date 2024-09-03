import { Schema, model, Document, Types } from 'mongoose';

interface ICategory extends Document {
  name: string;
  createdBy: Types.ObjectId; // Referencia al usuario que creó la categoría
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true, // Añade automáticamente createdAt y updatedAt
});

const CategoryModel = model<ICategory>('Category', CategorySchema);

export default CategoryModel;
