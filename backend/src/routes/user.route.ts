import { Router } from "express";
import { createUser, deleteUser } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const route = Router();

route.post('/user', createUser);
route.delete('/user/:id', authenticateToken, deleteUser);

export default route;