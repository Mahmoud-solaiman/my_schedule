import express from 'express';
import { createServer } from "node:http";
import { Server } from "socket.io";
import userRoutes from './routes/user.route';
import cors from 'cors';


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_ORIGIN_URL }
});

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN_URL
}));


app.use(express.json());

app.use('/api', userRoutes);

export default server;