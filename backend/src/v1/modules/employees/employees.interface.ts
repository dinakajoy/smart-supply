import { Document } from 'mongoose';

export interface IRole {
  label: string;
  role: string;
}

export interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
  role: IRole;
  password: string;
  mustResetPassword: boolean;
  isActive: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdBy: string;
  updatedBy: string;
}
