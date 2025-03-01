import mongoose, { Schema, Document } from "mongoose";
import { IRole } from "./userRole.interface";

const RoleSchema = new Schema<IRole>({
  slug: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  description: { type: String },
  permissions: [{ type: String, ref: "Permission" }],
});

export const Role = mongoose.model<IRole>("Role", RoleSchema);