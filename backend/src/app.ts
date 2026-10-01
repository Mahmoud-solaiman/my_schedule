import express from 'express';
import { createServer } from "node:http";
import { Server } from "socket.io";
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_ORIGIN_URL, credentials: true }
});

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN_URL,
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', authRoutes);

export default server;