import { Types } from "mongoose";

export type User = {
  _id: string | Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'superadmin' | 'admin' | 'user';
  isPasswordUpdated: boolean;
  permissions: {
    canAddAndRemoveAccounts: boolean;
    canChangeRoles: boolean;
    canEditSchedules: boolean;
    canCreateSchdedules: boolean;
    canEditTheirSchedule: boolean;
  }
}