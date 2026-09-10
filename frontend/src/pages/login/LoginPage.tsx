import { FirstLogin } from "./FirstLogin";
import { Login } from "./Login"

export function LoginPage() {
  const isFirstLogin = localStorage.getItem('isFirstLogin');

  return (
    <div className="h-screen flex justify-center items-center">
      {
        !isFirstLogin
        ? <FirstLogin />
        : <Login />
      }
    </div>
  );
};