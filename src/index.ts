import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';

const app = await createApp();

app.listen(env.PORT, () => {
  logger.info(`Server chạy tại http://localhost:${env.PORT} (${env.NODE_ENV})`);
});
