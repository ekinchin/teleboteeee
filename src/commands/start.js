import { sendMessage } from '../telegram';

export default {
  descripion: 'Приветствие от бота',
  run: async (payload) => {
    const answer = `Hello, ${payload.from.first_name}`;
    const result = await sendMessage(payload.chat.id, answer);
    return result;
  },
};
