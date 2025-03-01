import mongoose, { Schema, Document } from "mongoose";
import { IPermission } from "./permission.interface";

const PermissionSchema = new Schema<IPermission>({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  group: {
    type: String,
    enum: ["User Role", "Permissions", "Employees"],
    required: true,
  },
});

export const Permission = mongoose.model<IPermission>("Permission", PermissionSchema);