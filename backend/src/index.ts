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

const app: Express = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cors());
app.use(morgan('dev'));

// for producing the docs that define the API
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
