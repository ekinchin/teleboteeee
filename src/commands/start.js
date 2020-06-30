//   '/start': {
//     descripion: 'Начать работу с ботом',
//     handler:
//     async (chatId, data) => {
//       const answer = `Hello, ${data.message.from.first_name}`;
//       await httpRequest(telegramUrl, { 'Content-Type': 'application/json' }, { method: CMD.sendMessage, chat_id: chatId, text: answer }, 'POST');
//     },
//   },
