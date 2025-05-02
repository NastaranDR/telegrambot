import TelegramBot, { Message } from 'node-telegram-bot-api';
import { storage } from '../storage';
import { CommandHandler, Messages } from '../types';
import { logger } from '../utils/logger';

export const handleSendCommand: CommandHandler = async (
  bot: TelegramBot,
  msg: Message,
  match: RegExpExecArray | null
): Promise<void> => {
  const chatId = msg.chat.id;
  const text = match?.[1] || '';

  logger.info(`User ${chatId} requested to send text message`);

  // Check if the user has configured a channel
  const channelInfo = storage.getChannel(chatId);
  if (!channelInfo) {
    await bot.sendMessage(chatId, Messages.SET_CHANNEL_FIRST);
    return;
  }

  const { channelId } = channelInfo;

  try {
    // Send the message to the channel
    await bot.sendMessage(channelId, text);

    // Notify the user that the message was sent successfully
    await bot.sendMessage(chatId, Messages.MESSAGE_SENT);

    logger.info(`Text message sent to channel ${channelId} for user ${chatId}`);
  } catch (error) {
    logger.error(`Failed to send text message to channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.MESSAGE_FAILED);
  }
};