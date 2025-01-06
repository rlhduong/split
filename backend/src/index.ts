import express, { Express, json, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './utils/interface';
var SQLiteStore = require('connect-sqlite3')(session);

import sui from 'swagger-ui-express';
import sjsdoc from 'swagger-jsdoc';
import process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import trips from './routes/trips';
import auth from './routes/auth';
import expense from './routes/expense'
import errorHandler from 'middleware-http-errors';

import { reset } from './db';

const app: Express = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,              
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  session({
    store: new SQLiteStore({dir: './src/', db: 'database.db', table: 'sessions'}),
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
app.use(expense);

app.delete('/clear', (req: Request, res: Response) => {
  reset();
  res.send({});
});

app.use(errorHandler());


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'This is a sample Express API',
    },
  },
  apis: ['./src/routes/*.ts'],
};
const docs = sjsdoc(swaggerOptions);
app.use('/docs', sui.serve,  sui.setup(docs));

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
