import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { useEffect, useState } from "react";
import MessagePopUp from "./components/MessagePopUp";


export default function App() {
  const navigator = useNavigate();
  const [ message, setMessage ] = useState<string>('');
  const [ isMessage, setIsMessage ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(true);

  useEffect(() => {
    navigator('/user/login');
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
        <Route path="/user/login" element={
          <LoginPage 
            setMessage={setMessage} 
            setIsMessage={setIsMessage}
            setIsError={setIsError}
          />
        } />
      </Routes>
    </>
  );
}