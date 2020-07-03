import { sendMessage } from '../telegram';

export default {
  descripion: 'Неизвестная команда',
  run: async (payload) => {
    const answer = 'Неизвестная команда, воспользуйтесь справкой /help';
    const result = await sendMessage(payload.chat.id, answer);
    return result;
  },
};
