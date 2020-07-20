import { sendMessage } from '../telegram';

export default {
  description: 'Приветствие от бота',
  run: async (payload, context) => {
    const answer = `Hello, ${payload.from.first_name}`;
    const result = await sendMessage(payload.chat.id, answer);
    return {
      ...context,
      commandDone: true,
      result,
    };
  },
};
