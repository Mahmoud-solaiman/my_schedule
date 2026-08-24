import app from "./app";
import dotenv from 'dotenv';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});