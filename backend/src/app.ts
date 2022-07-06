import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import './database/typeorm';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server Ok!');
});

export { app };
