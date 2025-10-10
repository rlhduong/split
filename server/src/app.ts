import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

/*ROUTES IMPORT*/
import userRoutes from './routes/user';
import tripRoutes from './routes/trips';
import expensesRoutes from './routes/expenses';

/*CONFIG*/
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cookieParser());

/* DEPLOYMENT CONFIGS */

app.use(
  cors({
    origin: 'https://tripping.rlhduong.com',
    credentials: true,
  })
);

/*ROUTES USE*/
app.use('/users', userRoutes);
app.use('/trips', tripRoutes);
app.use('/trips/:tripId/expenses', expensesRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
