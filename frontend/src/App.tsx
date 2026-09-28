import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage";
import { useEffect, useState } from "react";
import MessagePopUp from "./components/MessagePopUp";


export default function App() {
  const navigator = useNavigate();
  const [ message, setMessage ] = useState<string>('');
  const [ isMessage, setIsMessage ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(true);

  useEffect(() => {
    navigator('/auth/login');
  }, [navigator]);
  
  return (
    <>
      {
        isMessage && 
          <MessagePopUp 
            message={message}
            hidePopUp={setIsMessage}
            isError={isError}
          />
      }
      <Routes>
        <Route path="/auth/register" element={
          <AuthPage 
            setMessage={setMessage} 
            setIsMessage={setIsMessage}
            setIsError={setIsError}
            type="register"
          />
        } />
        <Route path="/auth/login" element={
          <AuthPage 
            setMessage={setMessage} 
            setIsMessage={setIsMessage}
            setIsError={setIsError}
            type="login"
          />
        } />
      </Routes>
    </>
  );
}