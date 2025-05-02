"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const socks_proxy_agent_1 = require("socks-proxy-agent");
const TOKEN = '8189013528:AAFx0Hj3UrxpzOwF9INfPX9iKZ_kvVHLnUo';
const userChannelMap = new Map();
const proxyUrl = 'socks5h://127.0.0.1:9050';
const agent = new socks_proxy_agent_1.SocksProxyAgent(proxyUrl);
const bot = new node_telegram_bot_api_1.default(TOKEN, {
    polling: true,
    request: {
        url: 'https://api.telegram.org',
        agent: agent
    }
});
bot.onText(/\/set_channel (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const channelId = match?.[1];
    if (!channelId) {
        return bot.sendMessage(chatId, '❌ لطفاً آیدی کانال را وارد کن. مثل: /set_channel @mychannel');
    }
    try {
        const member = await bot.getChatMember(channelId, (await bot.getMe()).id);
        if (member.status === 'administrator' || member.status === 'creator') {
            userChannelMap.set(chatId, channelId); // ذخیره آیدی کانال برای این کاربر
            await bot.sendMessage(chatId, `✅ من ادمین کانال ${channelId} هستم. حالا می‌تونی پیام یا عکس بفرستی.`);
        }
        else {
            await bot.sendMessage(chatId, `❌ من در کانال ${channelId} هستم ولی ادمین نیستم. لطفاً ادمین کن.`);
        }
    }
    catch (error) {
        await bot.sendMessage(chatId, `❌ من عضو این کانال نیستم یا آیدی اشتباهه. من رو به کانالت اضافه و ادمین کن.`);
    }
});
bot.onText(/\/send (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match?.[1]; // متن پیام
    const channelId = userChannelMap.get(chatId);
    if (!channelId) {
        return bot.sendMessage(chatId, '❗️اول باید با دستور /set_channel آیدی کانالت رو مشخص کنی.');
    }
    try {
        await bot.sendMessage(channelId, text || '');
        await bot.sendMessage(chatId, '✅ پیام با موفقیت به کانال ارسال شد.');
    }
    catch (error) {
        await bot.sendMessage(chatId, '❌ ارسال پیام به کانال ناموفق بود.');
    }
});
bot.on('photo', async (msg) => {
    const chatId = msg.chat.id;
    const channelId = userChannelMap.get(chatId);
    if (!channelId)
        return bot.sendMessage(chatId, '❗️اول آیدی کانالت رو با /set_channel مشخص کن.');
    const photoArray = msg.photo;
    if (!photoArray || photoArray.length === 0)
        return;
    const photo = photoArray[photoArray.length - 1];
    try {
        await bot.sendPhoto(channelId, photo.file_id, {
            caption: msg.caption || '',
        });
        await bot.sendMessage(chatId, '✅ عکس با موفقیت به کانال ارسال شد.');
    }
    catch (error) {
        await bot.sendMessage(chatId, '❌ ارسال عکس ناموفق بود.');
    }
});
