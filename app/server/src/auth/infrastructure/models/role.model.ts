import { Schema, model, Document } from 'mongoose';

interface IRole extends Document {
  name: string;
  permissions: string[];
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permissions: { type: [String], required: true },
});

const RoleModel = model<IRole>('Role', RoleSchema);

export default RoleModel;
