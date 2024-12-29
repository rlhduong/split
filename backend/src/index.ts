import express, { Express, json, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './utils/interface';

import YAML from 'yaml';
import sui from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import trips from './routes/trips';
import auth from './routes/auth';
import friends from './routes/friend'
import errorHandler from 'middleware-http-errors';

import { reset } from './db';

const app: Express = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 30,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(trips);
app.use(auth);
app.use(friends);

const file = fs.readFileSync(path.join(process.cwd(), 'swagger.yaml'), 'utf8');
app.get('/', (req: Request, res: Response) => res.redirect('/docs'));
app.use(
  '/docs',
  sui.serve,
  sui.setup(YAML.parse(file), {
    swaggerOptions: { docExpansion: 'list' },
  })
);

app.delete('/clear', (req: Request, res: Response) => {
  reset();
  res.send({});
});

app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
