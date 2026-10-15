export interface PasswordInputProps extends React.ComponentPropsWithoutRef<"div"> {
  setPassword(value: string): void;
  placeholder: string;
  isDisabled?: boolean;
}

type Permissions = {
  canAddAndRemoveAccounts: boolean;
  canChangeRoles: boolean;
  canEditSchedules: boolean;
  canCreateSchdedules: boolean;
  canEditTheirSchedule: boolean;
}

export type User = {
  id: string,
  role: 'superadmin' | 'admin' | 'user',
  username: string,
  email: string,
  permissions: Permissions,
}

export type UserResponse = {
  msg: string;
  success: boolean;
  token?: string;
  user?: User
};


export interface MessagePopUpProps {
  message: string;
  delay?: number;
  isError?: boolean;
  hidePopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AuthProps {
  setMessagePopUp: (message: string, isError: boolean) => void;
  type?: 'register' | 'login';
}

export type LogInInfoState = {
  email: string;
  password: string;
  isChecking: boolean;
}

export type RegisterInfoState = {
  email: string;
  newPassword: string;
  confirmPassword: string;
  tempPassword: string;
  isChecking: boolean;
  isCorrectTempPassword: boolean;
}