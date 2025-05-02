import express from 'express';
import { logger } from './utils/logger';

// Get port from environment variable with fallback
const PORT = parseInt(process.env.PORT || '8000', 10);

/**
 * Start an Express server to keep the bot alive in hosting environments
 */
export function startServer(): void {
  const app = express();

  // Basic health check endpoint
  app.get('/', (req, res) => {
    res.status(200).send('Bot is running!');
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  // Start the server
  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Express server started on port ${PORT}`);
  });
}