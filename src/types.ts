import TelegramBot from 'node-telegram-bot-api';

/**
 * Channel information structure
 */
export interface ChannelInfo {
  channelId: string;
  memberStatus?: string;
  title?: string;
  timestamp: number;
}

/**
 * Command handler type
 */
export type CommandHandler = (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  match: RegExpExecArray | null
) => Promise<void>;

/**
 * Media handler type
 */
export type MediaHandler = (
  bot: TelegramBot,
  msg: TelegramBot.Message
) => Promise<void>;

/**
 * Media types supported by the bot
 */
export enum MediaType {
  PHOTO = 'photo',
  VIDEO = 'video',
  AUDIO = 'audio',
  VOICE = 'voice',
  DOCUMENT = 'document',
  STICKER = 'sticker',
  ANIMATION = 'animation'
}

/**
 * Success/failure message translations
 */
export const Messages = {
  // Help message
  HELP_MESSAGE: `🤖 *Channel Management Bot* 🤖
  
This bot helps you manage your Telegram channels.

*Commands:*
/set_channel @YourChannelUsername - Set the channel for posting
/set_channel -100123456789 - Set channel using ID
/send Your message text - Send text to your channel

*Media:*
Simply send any media type to the bot and it will be forwarded to your channel.
Supported media: photos, videos, audio, documents, stickers, GIFs.

*Text Messages:*
You can simply type any text message to the bot, and it will be forwarded to your channel.

*Notes:*
- You must be an admin of the channel
- The bot must be added to the channel as an admin`,

  // Channel setting messages
  CHANNEL_ID_REQUIRED: '❌ Please provide a channel username or ID after the command. Example: `/set_channel @YourChannel` or `/set_channel -100123456789`',
  BOT_IS_ADMIN: '✅ Successfully configured to post to channel: *%s*. You can now send content to this channel!',
  BOT_NOT_ADMIN: '⚠️ I am a member of *%s*, but not an admin. Please make me an admin of the channel to enable posting.',
  BOT_NOT_MEMBER: '❌ I could not access the specified channel. Please add me to the channel as an admin and try again.',

  // Sending messages
  SET_CHANNEL_FIRST: '⚠️ Please set a target channel first using the `/set_channel` command.',
  MESSAGE_SENT: '✅ Message sent successfully to your channel!',
  MESSAGE_FAILED: '❌ Failed to send message to the channel. Please check that I still have permission to post.',

  // Media messages
  PHOTO_SENT: '✅ Photo sent successfully to your channel!',
  PHOTO_FAILED: '❌ Failed to send photo to the channel.',

  VIDEO_SENT: '✅ Video sent successfully to your channel!',
  VIDEO_FAILED: '❌ Failed to send video to the channel.',

  AUDIO_SENT: '✅ Audio sent successfully to your channel!',
  AUDIO_FAILED: '❌ Failed to send audio to the channel.',

  VOICE_SENT: '✅ Voice message sent successfully to your channel!',
  VOICE_FAILED: '❌ Failed to send voice message to the channel.',

  DOCUMENT_SENT: '✅ Document sent successfully to your channel!',
  DOCUMENT_FAILED: '❌ Failed to send document to the channel.',

  STICKER_SENT: '✅ Sticker sent successfully to your channel!',
  STICKER_FAILED: '❌ Failed to send sticker to the channel.',

  ANIMATION_SENT: '✅ Animation sent successfully to your channel!',
  ANIMATION_FAILED: '❌ Failed to send animation to the channel.',

  TEXT_SENT: '✅ Text message sent successfully to your channel!',
  TEXT_FAILED: '❌ Failed to send text message to the channel.'
};