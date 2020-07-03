import { sendMessage } from '../telegram';

export default {
  descripion: 'Помощь',
  run: async (payload) => {
    const answer = '/start - поздороваться\n/weather - текущая погода\n/help - эта справка';
    const result = await sendMessage(payload.chat.id, answer);
    return result;
  },
};
