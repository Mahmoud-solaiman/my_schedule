import express from 'express';
import cors from 'cors';
import schedulRoutes from "./routes/schedule.route";


const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use('/api', schedulRoutes)

export default app;