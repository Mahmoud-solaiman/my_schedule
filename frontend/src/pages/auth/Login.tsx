import { useState } from "react";
import { PasswordInput } from "../../components/PasswordInput";
import type { UserResponse, AuthProps, LogInInfoState } from "../../types/types";
import { Spinner } from "../../components/loaders/Spinner";
import axios from "axios";
import { api } from "../../api/api";
import * as EmailValidator from 'email-validator';
import { useNavigate } from "react-router-dom";
import './Auth.scss';

export function Login({ setMessagePopUp }: AuthProps) {
  const [ logInInfo, setLogInInfo ] = useState<LogInInfoState>({
    email: '',
    password: '',
    isChecking: false
  });

  const navigator = useNavigate();

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

      if (response.data.user?.username) {
        sessionStorage.setItem('username', response.data.user?.username);
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
    <form className="register-form" onSubmit={logInUser}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z" />
        </svg>
        <input required autoFocus onChange={e => {
          const email = e.currentTarget.value 
          setLogInInfo(prevInfo => ({ ...prevInfo, email }));
        }} type="email" name="email" id="email" autoComplete="on" placeholder="AbrahamAdam@nationwidemedical.com" />
      </div>
      <PasswordInput
        setPassword={(password) => {
          setLogInInfo(prevInfo => ({ ...prevInfo, password }));
        }}
        placeholder="Password"
      />
      <div>
        {
          logInInfo.isChecking && <Spinner className="spinner-container" />
        }
        <button type="submit">
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