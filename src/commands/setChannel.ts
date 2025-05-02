import TelegramBot, { Message } from 'node-telegram-bot-api';
import { storage } from '../storage';
import { CommandHandler, Messages } from '../types';
import { logger } from '../utils/logger';

/**
 * Handle the /set_channel command
 * This command allows users to specify which channel the bot should post to
 */
export const handleSetChannelCommand: CommandHandler = async (
  bot: TelegramBot,
  msg: Message,
  match: RegExpExecArray | null
): Promise<void> => {
  const chatId = msg.chat.id;
  const channelId = match?.[1];

  logger.info(`User ${chatId} requested to set channel: ${channelId}`);

  if (!channelId) {
    await bot.sendMessage(chatId, Messages.CHANNEL_ID_REQUIRED);
    return;
  }

  try {
    // Get bot's own ID
    const botInfo = await bot.getMe();

    // Check if bot is a member of the specified channel
    const member = await bot.getChatMember(channelId, botInfo.id);

    // Get channel info
    const chat = await bot.getChat(channelId);
    const channelTitle = chat.title || channelId;

    if (member.status === 'administrator' || member.status === 'creator') {
      // Bot is an admin in the channel, save the mapping
      storage.setChannel(chatId, {
        channelId,
        memberStatus: member.status,
        title: channelTitle,
        timestamp: Date.now()
      });

      await bot.sendMessage(
        chatId,
        Messages.BOT_IS_ADMIN.replace('%s', channelTitle)
      );
    } else {
      // Bot is in the channel but not an admin
      await bot.sendMessage(
        chatId,
        Messages.BOT_NOT_ADMIN.replace('%s', channelTitle)
      );
    }
  } catch (error) {
    logger.error(`Error while setting channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.BOT_NOT_MEMBER);
  }
};