import express, { type Express } from 'express';
import cors from 'cors';
import * as http from 'http';

import { IAuthMiddleware } from '../middlewares/auth.middleware.js';

export const app: Express = express();

export const APPLICATION_PORT = 8080;

export const configMiddleware = async (authMiddleware: IAuthMiddleware) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/protected/*', authMiddleware.authenticate);
};

export const startExpressServer = (port: number): Promise<http.Server> => {
  return new Promise((resolve, reject) => {
    const server = app
      .listen(port, () => {
        resolve(server);
      })
      .on('error', (err: Error) => {
        reject(err);
      });
  });
};
