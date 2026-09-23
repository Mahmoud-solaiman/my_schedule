import { Schema, model, Document } from "mongoose";
import { User } from "../types/types";

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'user'],
    default: 'user',
    required: true
  },
  isPasswordUpdated: {
    type: Boolean,
    required: true,
    default: false
  },
  permissions: {
    canAddAndRemoveAccounts: { type: Boolean, default: false },
    canChangeRoles: { type: Boolean, default: false },
    canEditSchedules: { type: Boolean, default: false },
    canCreateSchdedules: { type: Boolean, default: false },
    canEditTheirSchedule: { type: Boolean, default: false },
  }
}, { timestamps: true });

type UserDocument = Document & User;

userSchema.pre('save', async function (this: UserDocument) {
  if (this.isModified('role') || this.isNew) {
    if (this.role === 'superadmin') {
      this.permissions = {
        canAddAndRemoveAccounts: true,
        canChangeRoles: true,
        canEditSchedules: true,
        canCreateSchdedules: true,
        canEditTheirSchedule: true,
      }
    } else if (this.role === 'admin') {
      this.permissions = {
        canAddAndRemoveAccounts: true,
        canChangeRoles: false,
        canEditSchedules: true,
        canCreateSchdedules: true,
        canEditTheirSchedule: true,
      }
    } else {
        this.permissions = {
        canAddAndRemoveAccounts: false,
        canChangeRoles: false,
        canEditSchedules: false,
        canCreateSchdedules: false,
        canEditTheirSchedule: false,
      }
    }
  }
}); 

export default model<User>('User', userSchema);