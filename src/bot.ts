import TelegramBot, { Message } from 'node-telegram-bot-api';
import { SocksProxyAgent } from 'socks-proxy-agent';

const TOKEN : string = '8189013528:AAFx0Hj3UrxpzOwF9INfPX9iKZ_kvVHLnUo';

const userChannelMap  = new Map<number, string>();

const proxyUrl : string = 'socks5h://127.0.0.1:9050';
const agent :SocksProxyAgent = new SocksProxyAgent(proxyUrl);

const bot : TelegramBot = new TelegramBot(TOKEN, {
  polling: true,
  request: {
    url: 'https://api.telegram.org',
    agent: agent as any
  }
});


bot.onText(/\/set_channel (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const channelId = match?.[1];

  if (!channelId) {
    return bot.sendMessage(chatId, '❌ لطفاً آیدی کانال را وارد کن.');
  }

  try {
    const member = await bot.getChatMember(channelId, (await bot.getMe()).id);
    if (member.status === 'administrator' || member.status === 'creator') {
      userChannelMap.set(chatId, channelId);
      await bot.sendMessage(chatId, `✅ من ادمین کانال ${channelId} هستم.`);
    } else {
      await bot.sendMessage(chatId, `❌ من در کانال ${channelId} هستم ولی ادمین نیستم.`);
    }
  } catch (error) {
    await bot.sendMessage(chatId, `❌ من عضو کانال نیستم یا آیدی اشتباهه.`);
  }
});


bot.onText(/\/send (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match?.[1];
  const channelId = userChannelMap.get(chatId);
  if (!channelId) return bot.sendMessage(chatId, '❗️اول باید با /set_channel آیدی کانالت رو مشخص کنی.');

  try {
    await bot.sendMessage(channelId, text || '');
    await bot.sendMessage(chatId, '✅ پیام ارسال شد.');
  } catch {
    await bot.sendMessage(chatId, '❌ ارسال متن ناموفق بود.');
  }
});


bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  const channelId = userChannelMap.get(chatId);
  if (!channelId || !msg.photo) return;

  const photo = msg.photo[msg.photo.length - 1];
  try {
    await bot.sendPhoto(channelId, photo.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, '✅ عکس ارسال شد.');
  } catch {
    await bot.sendMessage(chatId, '❌ ارسال عکس ناموفق بود.');
  }
});


bot.on('video', async (msg) => {
  const chatId = msg.chat.id;
  const channelId = userChannelMap.get(chatId);
  if (!channelId || !msg.video) return;

  try {
    await bot.sendVideo(channelId, msg.video.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, '✅ ویدیو ارسال شد.');
  } catch {
    await bot.sendMessage(chatId, '❌ ارسال ویدیو ناموفق بود.');
  }
});


bot.on('audio', async (msg) => {
  const chatId = msg.chat.id;
  const channelId = userChannelMap.get(chatId);
  if (!channelId || !msg.audio) return;

  try {
    await bot.sendAudio(channelId, msg.audio.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, '✅ موزیک ارسال شد.');
  } catch {
    await bot.sendMessage(chatId, '❌ ارسال موزیک ناموفق بود.');
  }
});


bot.on('voice', async (msg) => {
  const chatId = msg.chat.id;
  const channelId = userChannelMap.get(chatId);
  if (!channelId || !msg.voice) return;

  try {
    await bot.sendVoice(channelId, msg.voice.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, '✅ ویس ارسال شد.');
  } catch {
    await bot.sendMessage(chatId, '❌ ارسال ویس ناموفق بود.');
  }
});


bot.on('document', async (msg) => {
  const chatId = msg.chat.id;
  const channelId = userChannelMap.get(chatId);
  if (!channelId || !msg.document) return;

  try {
    await bot.sendDocument(channelId, msg.document.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, '✅ فایل ارسال شد.');
  } catch {
    await bot.sendMessage(chatId, '❌ ارسال فایل ناموفق بود.');
  }
});


bot.on('sticker', async (msg) => {
  const chatId = msg.chat.id;
  const channelId = userChannelMap.get(chatId);
  if (!channelId || !msg.sticker) return;

  try {
    await bot.sendSticker(channelId, msg.sticker.file_id);
    await bot.sendMessage(chatId, '✅ استیکر ارسال شد.');
  } catch {
    await bot.sendMessage(chatId, '❌ ارسال استیکر ناموفق بود.');
  }
});


bot.on('animation', async (msg) => {
  const chatId = msg.chat.id;
  const channelId = userChannelMap.get(chatId);
  if (!channelId || !msg.animation) return;

  try {
    await bot.sendAnimation(channelId, msg.animation.file_id, { caption: msg.caption || '' });
    await bot.sendMessage(chatId, '✅ گیف ارسال شد.');
  } catch {
    await bot.sendMessage(chatId, '❌ ارسال گیف ناموفق بود.');
  }
});



