import mongoose, { Schema } from 'mongoose';
import { IEmployee, IRole } from './employee.interface';

const RoleSchema = new Schema<IRole>({
  label: { type: String, required: true },
  role: { type: String, required: true },
});

const EmployeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: RoleSchema, required: true },
    password: { type: String, required: true },
    mustResetPassword: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);
