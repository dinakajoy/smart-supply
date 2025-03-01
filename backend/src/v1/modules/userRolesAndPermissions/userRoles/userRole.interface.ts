import {  Document } from "mongoose";

export interface IRole extends Document {
  slug: string;
  role: string;
  description: string;
  permissions: string[];
}