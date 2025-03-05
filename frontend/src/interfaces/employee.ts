export interface IEmployee {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
  role: string;
  label?: string;
  password?: string;
  mustResetPassword?: boolean;
  isActive?: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdBy?: string;
  updatedBy?: string;
}
