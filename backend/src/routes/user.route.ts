import { Router } from "express";
import { createUser, deleteUser, registerUser, updatePassword } from "../controllers/user.controller";
import { checkPassword } from "../middleware/check-password.middleware";

const route = Router();

route.post('/user', createUser);
route.delete('/user/:id', deleteUser);
route.post('/user/register', registerUser);
route.patch('/user/password', checkPassword, updatePassword);

export default route;