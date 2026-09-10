import server from "./app";
import { connectDB } from "./config/db";
import dotenv from 'dotenv';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});