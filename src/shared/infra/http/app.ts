import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: 'Challenge Back End | URL Shortener',
      version: '1.0.0',
      description:
        'API to shorten urls and /or redirect shortened links to the original url',
    },
    host: 'localhost:3333',
    basePath: '/',
  },
  apis: ['./src/**/*.routes.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
