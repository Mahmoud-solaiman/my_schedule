export interface PasswordInputProps extends React.ComponentPropsWithoutRef<"div"> {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  isDisabled?: boolean;
}

export type UserResponse = {
  msg: string;
  success: boolean;
  user: {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: "superadmin" | "admin" | "user";
    permissions: {
      canAddAndRemoveAccounts: boolean;
      canChangeRoles: boolean;
      canEditSchedules: boolean;
      canCreateSchdedules: boolean;
      canEditTheirSchedule: boolean;
    };
  };
};


export interface MessagePopUpProps {
  message: string;
  delay?: number;
  isError?: boolean;
  hidePopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LogInProps {
  setIsMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}