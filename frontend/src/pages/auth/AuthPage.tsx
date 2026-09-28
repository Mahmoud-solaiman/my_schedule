import { Link } from "react-router-dom";
import type { AuthProps } from "../../types/types";
import { Login } from "./Login";
import { Register } from "./Register";

export function AuthPage({ setMessagePopUp, type }: AuthProps) {

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-10">
      <div className="sm:w-120 bg-ultra-dark text-center rounded-xl py-5 px-3 shadow-[0_0_250px_-50px_#b1b1b1] transition-all">
        <div>
          <h2 className="text-3xl font-bold">
            {
              type === 'register'
              ? 'Welcome To MySchedule'
              : 'Welcome Back To MySchedule'
            }
          </h2>
          <h3 className="text-2xl text-light-gray">
            {
              type === 'register'
              ? 'Happy New Journey'
              : 'Good luck with your new day'
            }
          </h3>
        </div>

        { 
          type === 'register'
          ? <Register 
              setMessagePopUp={setMessagePopUp}
            />
          : <Login 
              setMessagePopUp={setMessagePopUp}
            />
        }
      </div>

      <Link to={ type === 'register' ? '/auth/login' : '/auth/register' }className="cursor-pointer text-lg hover:opacity-70 font-semibold transition-all">
        {
          type === 'register' 
          ? 'Already have an account?'
          : 'Register your new account'
        }
      </Link>
    </div>
  );

};