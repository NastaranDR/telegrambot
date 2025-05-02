import TelegramBot from 'node-telegram-bot-api';
import { storage } from '../storage';
import { MediaType, Messages } from '../types';
import { logger } from '../utils/logger';

/**
 * Register all media handlers with the bot
 */
export function registerMediaHandlers(bot: TelegramBot): void {
  logger.info('Registering media handlers');

  // Text message handler
  bot.on('message', async (msg) => {
    // Only process text messages that are not commands
    if (msg.text && !msg.text.startsWith('/') && !msg.caption) {
      await handleTextMessage(bot, msg);
    }
  });

  // Photo handler
  bot.on(MediaType.PHOTO, async (msg) => {
    await handlePhotoMessage(bot, msg);
  });

  // Video handler
  bot.on(MediaType.VIDEO, async (msg) => {
    await handleVideoMessage(bot, msg);
  });

  // Audio handler
  bot.on(MediaType.AUDIO, async (msg) => {
    await handleAudioMessage(bot, msg);
  });

  // Voice handler
  bot.on(MediaType.VOICE, async (msg) => {
    await handleVoiceMessage(bot, msg);
  });

  // Document handler
  bot.on(MediaType.DOCUMENT, async (msg) => {
    await handleDocumentMessage(bot, msg);
  });

  // Sticker handler
  bot.on(MediaType.STICKER, async (msg) => {
    await handleStickerMessage(bot, msg);
  });

  // Animation handler
  bot.on(MediaType.ANIMATION, async (msg) => {
    await handleAnimationMessage(bot, msg);
  });

  logger.info('Media handlers registered');
}

/**
 * Handle photo messages
 */
async function handlePhotoMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const channelInfo = storage.getChannel(chatId);

  if (!channelInfo || !msg.photo) {
    await bot.sendMessage(chatId, Messages.SET_CHANNEL_FIRST);
    return;
  }

  const { channelId } = channelInfo;
  const photo = msg.photo[msg.photo.length - 1]; // Get highest resolution photo

  try {
    await bot.sendPhoto(channelId, photo.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, Messages.PHOTO_SENT);
    logger.info(`Photo sent to channel ${channelId} for user ${chatId}`);
  } catch (error) {
    logger.error(`Failed to send photo to channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.PHOTO_FAILED);
  }
}

/**
 * Handle video messages
 */
async function handleVideoMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const channelInfo = storage.getChannel(chatId);

  if (!channelInfo || !msg.video) {
    await bot.sendMessage(chatId, Messages.SET_CHANNEL_FIRST);
    return;
  }

  const { channelId } = channelInfo;

  try {
    await bot.sendVideo(channelId, msg.video.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, Messages.VIDEO_SENT);
    logger.info(`Video sent to channel ${channelId} for user ${chatId}`);
  } catch (error) {
    logger.error(`Failed to send video to channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.VIDEO_FAILED);
  }
}

/**
 * Handle audio messages
 */
async function handleAudioMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const channelInfo = storage.getChannel(chatId);

  if (!channelInfo || !msg.audio) {
    await bot.sendMessage(chatId, Messages.SET_CHANNEL_FIRST);
    return;
  }

  const { channelId } = channelInfo;

  try {
    await bot.sendAudio(channelId, msg.audio.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, Messages.AUDIO_SENT);
    logger.info(`Audio sent to channel ${channelId} for user ${chatId}`);
  } catch (error) {
    logger.error(`Failed to send audio to channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.AUDIO_FAILED);
  }
}

/**
 * Handle voice messages
 */
async function handleVoiceMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const channelInfo = storage.getChannel(chatId);

  if (!channelInfo || !msg.voice) {
    await bot.sendMessage(chatId, Messages.SET_CHANNEL_FIRST);
    return;
  }

  const { channelId } = channelInfo;

  try {
    await bot.sendVoice(channelId, msg.voice.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, Messages.VOICE_SENT);
    logger.info(`Voice sent to channel ${channelId} for user ${chatId}`);
  } catch (error) {
    logger.error(`Failed to send voice to channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.VOICE_FAILED);
  }
}

/**
 * Handle document messages
 */
async function handleDocumentMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const channelInfo = storage.getChannel(chatId);

  if (!channelInfo || !msg.document) {
    await bot.sendMessage(chatId, Messages.SET_CHANNEL_FIRST);
    return;
  }

  const { channelId } = channelInfo;

  try {
    await bot.sendDocument(channelId, msg.document.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, Messages.DOCUMENT_SENT);
    logger.info(`Document sent to channel ${channelId} for user ${chatId}`);
  } catch (error) {
    logger.error(`Failed to send document to channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.DOCUMENT_FAILED);
  }
}

/**
 * Handle sticker messages
 */
async function handleStickerMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const channelInfo = storage.getChannel(chatId);

  if (!channelInfo || !msg.sticker) {
    await bot.sendMessage(chatId, Messages.SET_CHANNEL_FIRST);
    return;
  }

  const { channelId } = channelInfo;

  try {
    await bot.sendSticker(channelId, msg.sticker.file_id);
    await bot.sendMessage(chatId, Messages.STICKER_SENT);
    logger.info(`Sticker sent to channel ${channelId} for user ${chatId}`);
  } catch (error) {
    logger.error(`Failed to send sticker to channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.STICKER_FAILED);
  }
}

/**
 * Handle animation messages
 */
async function handleAnimationMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const channelInfo = storage.getChannel(chatId);

  if (!channelInfo || !msg.animation) {
    await bot.sendMessage(chatId, Messages.SET_CHANNEL_FIRST);
    return;
  }

  const { channelId } = channelInfo;

  try {
    await bot.sendAnimation(channelId, msg.animation.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, Messages.ANIMATION_SENT);
    logger.info(`Animation sent to channel ${channelId} for user ${chatId}`);
  } catch (error) {
    logger.error(`Failed to send animation to channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.ANIMATION_FAILED);
  }
}

/**
 * Handle text messages
 */
async function handleTextMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const channelInfo = storage.getChannel(chatId);

  if (!channelInfo || !msg.text) {
    await bot.sendMessage(chatId, Messages.SET_CHANNEL_FIRST);
    return;
  }

  const { channelId } = channelInfo;

  try {
    // Send the text message to the configured channel
    await bot.sendMessage(channelId, msg.text);
    await bot.sendMessage(chatId, Messages.TEXT_SENT);
    logger.info(`Text message sent to channel ${channelId} for user ${chatId}`);
  } catch (error) {
    logger.error(`Failed to send text message to channel ${channelId} for user ${chatId}:`, error);
    await bot.sendMessage(chatId, Messages.TEXT_FAILED);
  }
}