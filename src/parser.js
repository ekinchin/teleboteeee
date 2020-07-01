function parser(data) {
  let dataParse = {};
  try {
    dataParse = JSON.parse(data);
  } catch {
    return Error('Invalid data');
  }
  const { message } = dataParse;
  const { entities } = message || undefined;
  const { type } = entities[0] || undefined;
  if (type === 'bot_command') {
    const { chat } = message || undefined;
    const { from } = message || undefined;
    const { text } = message || undefined;
    const command = text.split(' ')[0].toLowerCase();
    return {
      command,
      chat,
      from,
      text,
    };
  }
  return Error('not bot command');
}

export default parser;
