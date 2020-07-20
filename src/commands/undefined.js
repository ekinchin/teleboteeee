import { sendMessage } from '../telegram';

export default {
  description: 'Неизвестная команда',
  run: async (payload) => {
    const answer = 'Неизвестная команда, воспользуйтесь справкой /help';
    const result = await sendMessage(payload.chat.id, answer);
    return result;
  },
};
