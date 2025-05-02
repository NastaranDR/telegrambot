import TelegramBot from 'node-telegram-bot-api';
import { handleSetChannelCommand } from './setChannel';
import { handleSendCommand } from './send';
import { Messages } from '../types';
import { logger } from '../utils/logger';

/**
 * Register all command handlers with the bot
 */
export function registerCommands(bot: TelegramBot): void {
  logger.info('Registering command handlers');

  // Handle /set_channel command with parameter
  bot.onText(/\/set_channel(?:@\w+)? (.+)/, async (msg, match) => {
    await handleSetChannelCommand(bot, msg, match);
  });

  // Handle /set_channel command without parameter
  bot.onText(/^\/set_channel(?:@\w+)?$/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, Messages.CHANNEL_ID_REQUIRED);
  });

  // Handle /send command with parameter
  bot.onText(/\/send(?:@\w+)? (.+)/, async (msg, match) => {
    await handleSendCommand(bot, msg, match);
  });

  // Handle /send command without parameter
  bot.onText(/^\/send(?:@\w+)?$/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Please provide a message to send. Example: `/send Hello world!`');
  });

  // Handle /start command
  bot.onText(/\/start(?:@\w+)?/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, Messages.HELP_MESSAGE, { parse_mode: 'Markdown' });
  });

  // Handle /help command
  bot.onText(/\/help(?:@\w+)?/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, Messages.HELP_MESSAGE, { parse_mode: 'Markdown' });
  });

  logger.info('Command handlers registered');
}