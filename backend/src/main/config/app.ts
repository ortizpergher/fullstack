import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { makeRoutes } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.send('Server Ok!');
});
makeRoutes(app);

export { app };
