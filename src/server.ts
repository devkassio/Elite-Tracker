import dotenv from 'dotenv';
import express from 'express';
import { router } from './routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
