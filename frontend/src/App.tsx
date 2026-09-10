import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { useEffect } from "react";


export default function App() {
  const navigator = useNavigate();

  useEffect(() => {
    navigator('/user/login');
  }, [navigator]);
  
  return (
    <Routes>
      <Route path="/user/login" element={<LoginPage />} />
    </Routes>
  );
}