import {  Document } from "mongoose";

export interface IPermission extends Document {
  key: string;
  name: string;
  description: string;
  group: "User Role" | "Permissions" | "Employees";
}