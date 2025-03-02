import { Document } from 'mongoose';

export interface IAddress {
  streetNo: number;
  street: string;
  town: string;
  state: string;
  country: string;
}

export interface IRole {
  label: string;
  role: string;
}

export interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: IAddress;
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
