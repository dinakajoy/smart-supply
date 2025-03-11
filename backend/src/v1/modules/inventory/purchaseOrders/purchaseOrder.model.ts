import mongoose, { Schema } from 'mongoose';
import { IPurchaseOrder, IPurchaseOrderItem } from './purchaseOrder.interface';

const PurchaseOrderItemSchema = new Schema<IPurchaseOrderItem>({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true },
});

const PurchaseOrderSchema = new Schema<IPurchaseOrder>({
  orderNumber: { type: String, required: true, unique: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  items: { type: [PurchaseOrderItemSchema], required: true },
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'], default: 'PENDING' },
}, { timestamps: true });

export const PurchaseOrder = mongoose.model<IPurchaseOrder>('PurchaseOrder', PurchaseOrderSchema);