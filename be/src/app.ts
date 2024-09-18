import dotenv from 'dotenv';

const environment = process.env.NODE_ENV;

dotenv.config({
  path: `./environments/${environment}.env`,
});

import express from 'express';
import cors from 'cors';

import apiRoutes from './routes/v1';
import { logger } from './lib/logger';

const port = Number(process.env.PORT) || 3000;

const bootstrap = async () => {
  process.on('unhandledRejection', (reason: Error) => {
    console.log('Server rejected to start');
    throw reason;
  });

  try {
    const app = express();

    //Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: '*' }));

    //Routes
    app.use('/api/v1', apiRoutes);

    app.use('*', (req, res) => {
      res.status(404).json({
        status: 404,
        message: 'Page Not Found',
      });
    });

    return app;
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

bootstrap().then((app) =>
  app.listen(port, () => {
    console.log(`Listening on port ${port} in ${environment} mode`);
  })
);
