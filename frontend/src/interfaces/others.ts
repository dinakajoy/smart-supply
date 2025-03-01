import { UserRoleType } from "../constants";

export interface IPermission {
  _id?: string;
  key: string;
  name: string;
  description: string;
  group: UserRoleType;
}

export interface IRole {
  _id?: string;
  slug: string;
  role: string;
  description: string;
  permissions: string[];
}
