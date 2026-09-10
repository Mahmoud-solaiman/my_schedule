import express from 'express';
import { createServer } from "node:http";
import { Server } from "socket.io";
import schedulRoutes from "./routes/schedule.route";


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' }
});

app.use(express.json());

app.use('/api', schedulRoutes);

export default server;