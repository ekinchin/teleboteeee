import { URL } from 'url';
import request from '../httpRequest';

const { TELEGRAM_TOKEN } = process.env;

const telegramUrl = new URL('https://api.telegram.org');
telegramUrl.pathname = `bot${TELEGRAM_TOKEN}/sendMessage`;

export default {
  descripion: 'Неизвестная команда',
  handler: async (chatId) => {
    const answer = 'Неизвестная команда, воспользуйтесь справкой /help';
    await request(telegramUrl, { 'Content-Type': 'application/json' }, { method: 'sendMessage', chat_id: chatId, text: answer }, 'POST');
  },
};
