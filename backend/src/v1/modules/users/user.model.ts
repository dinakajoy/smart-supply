import mongoose, { Schema } from 'mongoose';
import { IUser, IRole } from './user.interface';
import { Organization } from 'modules/organizations/organization.model';

const RoleSchema = new Schema<IRole>({
  label: { type: String, required: true },
  role: { type: String, required: true },
});

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: RoleSchema, required: true },
    organizationId: { type: String, ref: 'Organization', required: true },
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

export const User = mongoose.model<IUser>('User', UserSchema);
