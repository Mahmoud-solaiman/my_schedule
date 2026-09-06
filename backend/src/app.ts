import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import schedulRoutes from "./routes/schedule.route";


const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173' }
});

app.use(express.json());

app.use('/api', schedulRoutes)

export default app;