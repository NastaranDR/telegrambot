import TelegramBot from 'node-telegram-bot-api';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { logger } from './utils/logger';
import { registerCommands } from './commands';
import { registerHandlers } from './handlers';

// Get token from environment variable with fallback
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8189013528:AAFx0Hj3UrxpzOwF9INfPX9iKZ_kvVHLnUo';

// Get proxy URL from environment variable (optional)
const PROXY_URL = process.env.SOCKS_PROXY_URL;

/**
 * Initialize and start the Telegram bot
 */
export function startBot(): TelegramBot {
  // Initialize bot options with polling enabled
  const options: TelegramBot.ConstructorOptions = {
    polling: true
  };

  // Use proxy if configured
  if (PROXY_URL) {
    logger.info('Initializing bot with proxy:', PROXY_URL);

    // Create SOCKS proxy agent
    const agent = new SocksProxyAgent(PROXY_URL);

    // Add proxy configuration
    options.request = {
      url: 'https://api.telegram.org',
      agent: agent
    };
  } else {
    logger.info('Initializing bot without proxy');
  }

  // Initialize bot with options
  const bot = new TelegramBot(TOKEN, options);

  // Set up error handler for polling errors
  bot.on('polling_error', (error: Error) => {
    logger.error('Polling error:', error);
  });

  // Register command handlers
  registerCommands(bot);

  // Register event handlers
  registerHandlers(bot);

  logger.info('Bot initialized successfully');

  return bot;
}