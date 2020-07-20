import { sendMessage } from '../telegram';

export default {
  description: 'Помощь',
  run: async (payload, context) => {
    const answer = '/start - поздороваться\n/weather - текущая погода\n/help - эта справка';
    const result = await sendMessage(payload.chat.id, answer);
    return {
      ...context,
      commandDone: true,
      result,
    };
  },
};
