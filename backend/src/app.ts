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
  cors: { origin: ['http://localhost:5173', 'http://192.168.1.7:5173', process.env.FRONTEND_ORIGIN_URL as string], credentials: true }
});

app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.1.7:5173', process.env.FRONTEND_ORIGIN_URL as string],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', authRoutes);

export default server;