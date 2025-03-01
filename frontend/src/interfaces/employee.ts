interface IAddress {
  streetNo?: number;
  street: string;
  town: string;
  state: string;
  country: string;
}

export interface IEmployeeWithoutPasswordAndRole {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address?: IAddress;
  department: string;
  mustResetPassword?: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdBy: string;
  updatedBy: string;
}

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address?: IAddress;
  department: string;
  role: string;
  password?: string;
  mustResetPassword?: boolean;
  isActive?: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdBy?: string;
  updatedBy?: string;
}
