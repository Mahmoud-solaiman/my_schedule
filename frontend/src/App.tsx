import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage";
import { useState } from "react";
import MessagePopUp from "./components/MessagePopUp";


export default function App() {
  const [ message, setMessage ] = useState<string>('');
  const [ isMessage, setIsMessage ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(true);

  const setMessagePopUp = (messageValue: string, error: boolean) => {
    setIsMessage(true);
    setIsError(error);
    setMessage(messageValue);
  }
  
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
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/register" element={
          <AuthPage 
            setMessagePopUp={setMessagePopUp}
            type="register"
          />
        } />
        <Route path="/auth/login" element={
          <AuthPage 
            setMessagePopUp={setMessagePopUp}
            type="login"
          />
        } />
      </Routes>
    </>
  );
}