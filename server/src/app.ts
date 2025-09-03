import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dynamoose from 'dynamoose';

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

if (process.env.NODE_ENV && process.env.NODE_ENV === 'dev') {
  dynamoose.aws.ddb.local('http://localhost:8000');
}

if (process.env.LOCALSTACK && process.env.LOCALSTACK === 'true') {
  app.use((req, res, next) => {
    if (Buffer.isBuffer(req.body)) {
      try {
        req.body = JSON.parse(req.body.toString());
      } catch {
        // ignore if it's not valid JSON
      }
    } else if (typeof req.body === 'string') {
      try {
        req.body = JSON.parse(req.body);
      } catch {
        // ignore
      }
    }
    next();
  });
}

/*ROUTES USE*/
app.use('/users', userRoutes);
app.use('/trips', tripRoutes);
app.use('/trips/:tripId/expenses', expensesRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
