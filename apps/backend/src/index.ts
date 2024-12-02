import { APPLICATION_PORT, startExpressServer } from './configuration/express.configuration.js';
import { configMiddleware } from './configuration/express.configuration.js';

const setupApplication = async () => {
  await configMiddleware();
  await startExpressServer(APPLICATION_PORT);
};

setupApplication();
