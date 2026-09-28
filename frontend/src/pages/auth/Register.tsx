import { useState } from "react";
import { Spinner } from "../../components/loaders/Spinner";
import { PasswordInput } from "../../components/PasswordInput";
import * as EmailValidator from 'email-validator';
import { api } from "../../api/api";
import type { RegisterInfoState, AuthProps, UserResponse } from "../../types/types";
import axios from "axios";

export function Register({ setIsMessage, setMessage, setIsError }: AuthProps) {

  const [ registerationInfo, setRegisterationInfo ] = useState<RegisterInfoState>({
    email: '',
    newPassword: '',
    confirmPassword: '',
    tempPassword: '',
    isChecking: false,
    isCorrectTempPassword: false,
  }); 

  const checkTempPassword = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = EmailValidator.validate(registerationInfo.email);
    if (!registerationInfo.isCorrectTempPassword && isValidEmail && registerationInfo.tempPassword) {
      setRegisterationInfo(prevInfo => ({...prevInfo, isChecking: true }));
      try {
        const response = await api.post<UserResponse>('/api/user/register', {
          email: registerationInfo.email.toLowerCase(),
          password: registerationInfo.tempPassword
        });

        if (response.data.success) {
          setRegisterationInfo(prevInfo => ({...prevInfo, isChecking: false }));
          setRegisterationInfo(prevInfo => ({...prevInfo, isCorrectTempPassword: true }));
          setMessage(response.data.msg);
          setIsMessage(true);
          setIsError(false);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.msg || 'Something went wrong. Please, try again momentarily.';
          setIsError(true);
          setMessage(message);
          setIsMessage(true);
        }
        setRegisterationInfo(prevInfo => ({...prevInfo, isChecking: false }));
      }

    } else if (registerationInfo.isCorrectTempPassword && registerationInfo.newPassword && registerationInfo.confirmPassword) {
      setRegisterationInfo(prevInfo => ({...prevInfo, isChecking: true }));
      try {
        const response = await api.patch<UserResponse>('/api/user/password', {
          email: registerationInfo.email.toLowerCase(),
          password: registerationInfo.newPassword,
          confirmPassword: registerationInfo.confirmPassword,
        });

        if (response.data.success) {
          setRegisterationInfo(prevInfo => ({...prevInfo, isChecking: false }));
          setMessage(response.data.msg);
          setIsMessage(true);
          setIsError(false);
        }

      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.msg || 'Something went wrong. Please, try again momentarily.';
          setIsError(true);
          setMessage(message);
          setIsMessage(true);
        }
        setRegisterationInfo(prevInfo => ({...prevInfo, isChecking: false }));
      }
    }
  }

  return (
    <form className="pt-10 flex gap-5 flex-col" onSubmit={checkTempPassword}>
      <div className="relative flex items-center">
        <svg className="w-8 absolute left-1.5 fill-light-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z" />
        </svg>
        <input disabled={registerationInfo.isCorrectTempPassword} required onChange={e => {
          const email = e.currentTarget.value;
          setRegisterationInfo(prevInfo => ({ ...prevInfo, email }))
        }} className="w-full disabled:opacity-30 bg-super-dark text-[1.35rem] focus-within:outline-0 pl-11 pr-3 py-2.5 rounded-lg" type="email" name="email" id="email" autoComplete="on" placeholder="AbrahamAdam@nationwidemedical.com" />
      </div>
      <PasswordInput
        setPassword={(tempPassword) => {
          setRegisterationInfo(prevInfo => ( {...prevInfo, tempPassword }))
        }}
        className="relative flex items-center"
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
              className="relative flex items-center animate-fade-in"
              placeholder="New password"
            />
            <PasswordInput
              setPassword={(confirmPassword) => {
                setRegisterationInfo(prevInfo => ({ ...prevInfo, confirmPassword }))
              }}
              className="relative flex items-center animate-fade-in"
              placeholder="Confirm password"
            />
          </>
        )
      }
      <div className="relative">
        {
          registerationInfo.isChecking && <Spinner className="absolute inset-0 bg-super-dark opacity-80 rounded-lg flex justify-center items-center" />
        }
        <button type="submit" className="bg-neon-blue w-full py-2 text-2xl rounded-lg cursor-pointer font-semibold hover:opacity-70 transition-all">
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