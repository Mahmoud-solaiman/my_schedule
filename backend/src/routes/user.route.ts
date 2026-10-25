import { Router } from "express";
import { createUser, deleteUser, lookupUser } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const route = Router();

route.post('/user', authenticateToken, createUser);
route.delete('/user/:id', authenticateToken, deleteUser);
route.get('/user', lookupUser);

export default route;