import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  sku: string;
  categoryId: mongoose.Types.ObjectId;
  unitPrice: number;
  quantity: number;
  description?: string;
}
