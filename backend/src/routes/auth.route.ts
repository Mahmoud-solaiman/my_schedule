import { Router } from "express";
import { handleLogout, handleRefreshToken, login, registerUser, updatePassword } from "../controllers/auth.controller";
import { checkLoginData } from "../middleware/auth.middleware";
import { checkPassword } from "../middleware/check-password.middleware";

const route = Router();

route.post('/auth/login', checkLoginData, login);
route.post('/auth/register', registerUser);
route.patch('/auth/password', checkPassword, updatePassword);
route.post('/auth/refresh', handleRefreshToken);
route.post('/auth/logout', handleLogout);

export default route;