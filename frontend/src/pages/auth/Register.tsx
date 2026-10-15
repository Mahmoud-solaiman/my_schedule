import { useState } from "react";
import { Spinner } from "../../components/loaders/Spinner";
import { PasswordInput } from "../../components/PasswordInput";
import * as EmailValidator from 'email-validator';
import { api } from "../../api/api";
import type { RegisterInfoState, AuthProps, UserResponse } from "../../types/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Auth.scss';

export function Register({ setMessagePopUp }: AuthProps) {

  const [registerationInfo, setRegisterationInfo] = useState<RegisterInfoState>({
    email: '',
    newPassword: '',
    confirmPassword: '',
    tempPassword: '',
    isChecking: false,
    isCorrectTempPassword: false,
  });

  const navigator = useNavigate();

  const checkTempPassword = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = EmailValidator.validate(registerationInfo.email);
    if (!registerationInfo.isCorrectTempPassword && isValidEmail && registerationInfo.tempPassword) {
      setRegisterationInfo(prevInfo => ({ ...prevInfo, isChecking: true }));
      try {
        const response = await api.post<UserResponse>('/api/auth/register', {
          email: registerationInfo.email.toLowerCase(),
          password: registerationInfo.tempPassword
        });

        setRegisterationInfo(prevInfo => ({ ...prevInfo, isChecking: false }));
        setRegisterationInfo(prevInfo => ({ ...prevInfo, isCorrectTempPassword: true }));
        setMessagePopUp(response.data.msg, false);

      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.msg || 'Something went wrong. Please, try again momentarily.';
          setMessagePopUp(message, true);
        }
        setRegisterationInfo(prevInfo => ({ ...prevInfo, isChecking: false }));
      }

    } else if (registerationInfo.isCorrectTempPassword && registerationInfo.newPassword && registerationInfo.confirmPassword) {
      setRegisterationInfo(prevInfo => ({ ...prevInfo, isChecking: true }));
      try {
        const response = await api.patch<UserResponse>('/api/auth/password', {
          email: registerationInfo.email.toLowerCase(),
          password: registerationInfo.newPassword,
          confirmPassword: registerationInfo.confirmPassword,
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        switch (response.data.user?.role) {
          case 'superadmin':
          case 'admin':
            navigator('/admin/dashboard');
            break;
          default:
            navigator('/user/dashboard');
            break;
        }
        
        setRegisterationInfo(prevInfo => ({ ...prevInfo, isChecking: false }));
        setMessagePopUp(response.data.msg, false);

      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.msg || 'Something went wrong. Please, try again momentarily.';
          setMessagePopUp(message, true);
        }
        setRegisterationInfo(prevInfo => ({ ...prevInfo, isChecking: false }));
      }
    }
  }

  return (
    <form className="register-form" onSubmit={checkTempPassword}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z" />
        </svg>
        <input disabled={registerationInfo.isCorrectTempPassword} autoFocus required onChange={e => {
          const email = e.currentTarget.value;
          setRegisterationInfo(prevInfo => ({ ...prevInfo, email }))
        }} type="email" name="email" id="email" autoComplete="on" placeholder="AbrahamAdam@nationwidemedical.com" />
      </div>
      <PasswordInput
        setPassword={(tempPassword) => {
          setRegisterationInfo(prevInfo => ({ ...prevInfo, tempPassword }))
        }}
        placeholder="Temp password"
        isDisabled={registerationInfo.isCorrectTempPassword}
      />
      {
        registerationInfo.isCorrectTempPassword &&
        (
          <>
            <PasswordInput
              setPassword={(newPassword) => {
                setRegisterationInfo(prevInfo => ({ ...prevInfo, newPassword }))
              }}
              className="animate-fade-in"
              placeholder="New password"
            />
            <PasswordInput
              setPassword={(confirmPassword) => {
                setRegisterationInfo(prevInfo => ({ ...prevInfo, confirmPassword }))
              }}
              className="animate-fade-in"
              placeholder="Confirm password"
            />
          </>
        )
      }
      <div>
        {
          registerationInfo.isChecking && <Spinner className="spinner-container" />
        }
        <button type="submit">
          {
            registerationInfo.isChecking
              ? registerationInfo.isCorrectTempPassword ? 'Updating...' : 'Checking...'
              : registerationInfo.isCorrectTempPassword ? 'Login' : 'Confirm'
          }
        </button>
      </div>
    </form>
  );
}