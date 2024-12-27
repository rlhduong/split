import express, { Express, json, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import YAML from 'yaml';
import sui from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

import trips from './routes/trips';
import auth from './routes/auth';

const app: Express = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cors());
app.use(morgan('dev'));
app.use(trips);
app.use(auth);

const file = fs.readFileSync(path.join(process.cwd(), 'swagger.yaml'), 'utf8');
app.get('/', (req: Request, res: Response) => res.redirect('/docs'));
app.use(
  '/docs',
  sui.serve,
  sui.setup(YAML.parse(file), {
    swaggerOptions: { docExpansion: false ? 'full' : 'list' },
  })
);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
