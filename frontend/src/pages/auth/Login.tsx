import { useState } from "react";
import { PasswordInput } from "../../components/PasswordInput";
import type { UserResponse, AuthProps, LogInInfoState } from "../../types/types";
import { Spinner } from "../../components/loaders/Spinner";
import axios from "axios";
import { api } from "../../api/api";
import * as EmailValidator from 'email-validator';

export function Login({ setMessagePopUp }: AuthProps) {
  const [ logInInfo, setLogInInfo ] = useState<LogInInfoState>({
    email: '',
    password: '',
    isChecking: false
  });

  const logInUser = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogInInfo(prevInfo => ({ ...prevInfo, isChecking: true }));

    try {
      if (!EmailValidator.validate(logInInfo.email)) {
        setMessagePopUp('Invalid email', true);
        setLogInInfo(prevInfo => ({ ...prevInfo, isChecking: false }));
        return;
      }
      const response = await api.post<UserResponse>('/api/auth/login', {
        email: logInInfo.email.toLowerCase(),
        password: logInInfo.password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setMessagePopUp(response.data.msg, false);
      setLogInInfo(prevInfo => ({ ...prevInfo, isChecking: false }));

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.msg || 'Something went wrong. Please, try again momentarily.';
        setMessagePopUp(message, true);
        setLogInInfo(prevInfo => ({ ...prevInfo, isChecking: false }));
      }
    }

  }
  return (
    <form className="pt-10 flex gap-5 flex-col" onSubmit={logInUser}>
      <div className="relative flex items-center">
        <svg className="w-8 absolute left-1.5 fill-light-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z" />
        </svg>
        <input required onChange={e => {
          const email = e.currentTarget.value 
          setLogInInfo(prevInfo => ({ ...prevInfo, email }));
        }} className="w-full disabled:opacity-30 bg-super-dark text-[1.35rem] focus-within:outline-0 pl-11 pr-3 py-2.5 rounded-lg" type="email" name="email" id="email" autoComplete="on" placeholder="AbrahamAdam@nationwidemedical.com" />
      </div>
      <PasswordInput
        setPassword={(password) => {
          setLogInInfo(prevInfo => ({ ...prevInfo, password }));
        }}
        className="relative flex items-center"
        placeholder="Password"
      />
      <div className="relative">
        {
          logInInfo.isChecking && <Spinner className="absolute inset-0 bg-[rgba(0,0,0,.7)] rounded-lg flex justify-center items-center" />
        }
        <button type="submit" className="bg-neon-blue w-full py-2 text-2xl rounded-lg cursor-pointer font-semibold hover:opacity-70 transition-all">
          {
            logInInfo.isChecking 
            ? 'Checking...'
            : 'Login'
          }
        </button>
      </div>
    </form>
  );
}