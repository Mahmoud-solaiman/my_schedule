import { Link } from "react-router-dom";
import type { AuthProps } from "../../types/types";
import { Login } from "./Login";
import { Register } from "./Register";
import './AuthPage.scss';

export function AuthPage({ setMessagePopUp, type }: AuthProps) {

  return (
    <div className="container">
      <div className="login-register-container">
        <div>
          <h2>
            {
              type === 'register'
              ? 'Welcome To MySchedule'
              : 'Welcome Back To MySchedule'
            }
          </h2>
          <h3>
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

      <Link to={ type === 'register' ? '/auth/login' : '/auth/register' }>
        {
          type === 'register' 
          ? 'Already have an account?'
          : 'Register your new account'
        }
      </Link>
    </div>
  );

};