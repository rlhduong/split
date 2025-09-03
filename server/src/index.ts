import serverless from 'serverless-http';
import app from './app';

export const handler = serverless(app, {
  basePath: '/dev', // strips /dev before Express sees it
});
