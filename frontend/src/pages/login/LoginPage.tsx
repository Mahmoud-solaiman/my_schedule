import { useState } from "react";
import { Spinner } from "../../components/loaders/Spinner";
import { PasswordInput } from "./PasswordInput";
import * as EmailValidator from 'email-validator';
import { api } from "../../api/api";
import type { UserResponse } from "../../types/types";

export function LoginPage() {
  const [ isChecking, setIsChecking ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>('');
  const [ tempPassword, setTempPassword ] = useState<string>('');
  const [ newPassword, setNewPassword ] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ isCorrectTempPassword, setIsCorrectTempPassword ] = useState<boolean>(false);

  const checkTempPassword = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = EmailValidator.validate(email);
    if (!isCorrectTempPassword && isValidEmail && tempPassword) {
      setIsChecking(true);
      try {
        const response = await api.post<UserResponse>('/api/user/register', {
          email: email.toLowerCase(),
          password: tempPassword
        });
        
        if (response.data.success) {
          setIsChecking(false);
          setIsCorrectTempPassword(true);
        }
      } catch (error) {
        console.log(error);
        setIsChecking(false);
      }

    } else if (isCorrectTempPassword && newPassword && confirmPassword && (newPassword === confirmPassword)) {
      setIsChecking(true);
      try {
        console.log(email);
        const response = await api.patch<UserResponse>('/api/user/password', {
          email: email.toLowerCase(),
          password: newPassword,
          confirmPassword
        });

        if (response.data.success) setIsChecking(false);

        console.log(response.data.msg);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-10">
      <div className="sm:w-120 bg-ultra-dark text-center rounded-xl py-5 px-3 shadow-[0_0_250px_-50px_#b1b1b1] transition-all">
        <div>
          <h2 className="text-3xl font-bold">Welcome To MySchedule</h2>
          <h3 className="text-2xl text-light-gray">Good luck with your new day</h3>
        </div>
        <form className="pt-10 flex gap-5 flex-col" onSubmit={checkTempPassword}>
          <div className="relative flex items-center">
            <svg className="w-8 absolute left-1.5 fill-light-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z" />
            </svg>
            <input disabled={isCorrectTempPassword} required onChange={e => setEmail(e.currentTarget.value)} className="w-full disabled:opacity-30 bg-super-dark text-[1.35rem] focus-within:outline-0 pl-11 pr-3 py-2.5 rounded-lg" type="email" name="email" id="email" autoComplete="on" placeholder="AbrahamAdam@nationwidemedical.com" />
          </div>
          <PasswordInput 
            setPassword={setTempPassword} 
            className="relative flex items-center" 
            placeholder="Temp password"
            isDisabled={isCorrectTempPassword}
          />
          {
            isCorrectTempPassword &&
            (
              <>
                <PasswordInput 
                  setPassword={setNewPassword} 
                  className="relative flex items-center animate-fade-in" 
                  placeholder="New password"
                />
                <PasswordInput 
                  setPassword={setConfirmPassword} 
                  className="relative flex items-center animate-fade-in" 
                  placeholder="Confirm password"
                />
              </>
            )
          }
          <div className="relative">
            {
              isChecking && <Spinner className="absolute inset-0 bg-super-dark opacity-80 rounded-lg flex justify-center items-center" />
            }
            <button type="submit" className="bg-neon-blue w-full py-2 text-2xl rounded-lg cursor-pointer font-semibold hover:opacity-70 transition-all">
              {
                isChecking
                ? isCorrectTempPassword ? 'Updating...' : 'Checking...'
                : isCorrectTempPassword ? 'Login' : 'Confirm'  
              }
            </button>
          </div>
        </form>
      </div>

      <button type="button" className="cursor-pointer text-lg hover:opacity-70 font-semibold transition-all">Already have an account?</button>
    </div>
  );
};