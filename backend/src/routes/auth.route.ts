import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { checkLoginData } from "../middleware/auth.middleware";

const route = Router();

route.post('/auth/login', checkLoginData, login);

export default route;