import mongoose, { Schema } from 'mongoose';
import { IOrganization} from './organization.interface';

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, unique: true },
  },
  { timestamps: true }
);

export const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);
