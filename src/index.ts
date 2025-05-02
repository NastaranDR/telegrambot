import { startBot } from './bot';
import { startServer } from './server';
import { logger } from './utils/logger';

/**
 * Main entry point for the application
 */
async function main() {
  try {
    logger.info('Starting application...');

    // Start the bot
    const bot = startBot();

    // Start the server to keep the application alive
    startServer();

    logger.info('Application started successfully');
  } catch (error) {
    logger.error('Application startup failed:', error);
    process.exit(1);
  }
}

// Run the application
main().catch(error => {
  logger.error('Unhandled exception in main process:', error);
  process.exit(1);
});