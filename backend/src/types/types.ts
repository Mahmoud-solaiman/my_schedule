import { Types } from "mongoose";

export type User = {
  _id: string | Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'superadmin' | 'admin' | 'user';
  isPasswordUpdated: boolean;
  title: string;
  department: string;
  account: string;
  permissions: {
    canAddAndRemoveAccounts: boolean;
    canChangeRoles: boolean;
    canEditSchedules: boolean;
    canCreateSchdedules: boolean;
    canEditTheirSchedule: boolean;
  }
  createdAt: Date;
  updatedAt: Date
}

export type JWTTokenPayload = {
  id: string;
  role: string;
  permissions: {
    canAddAndRemoveAccounts: boolean;
    canChangeRoles: boolean;
    canEditSchedules: boolean;
    canCreateSchdedules: boolean;
    canEditTheirSchedule: boolean;
  };
};