// function reqParse(data) {
//   const dataParse = JSON.parse(data);
//   const entities = dataParse.message.entities[0] || '';
//   if (entities.type === 'bot_command') {
//     switch (dataParse.message.text.split(' ')[0].toLowerCase()) {
//       case '/start':
//       case '/help':
//       case '/weather':
//         eventer.emit(dataParse.message.text.split(' ')[0].toLowerCase(), dataParse.message.chat.id, dataParse);
//         break;
//       default:
//         eventer.emit('undefined', dataParse.message.chat.id);
//         break;
//     }
//   }
//   return 0;
// }
