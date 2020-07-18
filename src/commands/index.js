/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';

const commandsLoad = () => {
  const files = fs.readdirSync('./dist/commands');
  const modules = files.filter(filename => filename !== 'index.js');
  return modules.reduce((commands, file) => {
    const commandname = `/${file.slice(0, -3)}`;
    const modulepath = `./${file}`;
    const module = require(modulepath).default;
    // eslint-disable-next-line no-param-reassign
    if (module) commands[commandname] = module;
    return commands;
  }, {});
};

const context = new Map();

const restoreContext = (chatId) => {
  if (context.has(chatId)) {
    return context.get(chatId);
  }
  return {
    currentCommand: undefined,
    prevCommand: undefined,
    commandDone: true,
  };
};

const commands = commandsLoad();

function parser(data) {
  let dataParse = {};
  try {
    dataParse = JSON.parse(data);
  } catch {
    return Error('Invalid data');
  }
  const { message } = dataParse;
  const { entities } = message || undefined;
  const { type } = entities ? entities[0] : { undefined };
  const { text } = message || undefined;
  const command = type === 'bot_command' ? text.split(' ')[0].toLowerCase() : undefined;
  return {
    command,
    ...message,
  };
}

const getCommand = (command, { prevCommand, commandDone, ...payload }) => {
  // получена новая  команда - сбросить контекст, вернуть новую команду
  if (command in commands) {
    return {
      currentCommand: command,
      prevCommand,
      commandDone: true,
    };
  }

  // получено сообщение не команда и предыдущая команда не была завершена.
  // Вернуть незавершенную команду, сохранить контекст
  if (!command && !commandDone) {
    return {
      ...payload,
      currentCommand: prevCommand,
      prevCommand,
      commandDone: false,
    };
  }
  // получена не команда и нет незавершенных команд. Вернуть команду undefined, сбросить контекст
  return {
    currentCommand: '/undefined',
    prevCommand: undefined,
    commandDone: true,
  };
};

const dispatch = async (data) => {
  const { command, ...payload } = parser(data);
  const prevContext = restoreContext(payload.chat.id);
  const currentContext = getCommand(command, prevContext);
  const { currentCommand } = currentContext;
  const result = await commands[currentCommand].run(payload, currentContext);
  context.set(payload.chat.id, {
    ...result,
    prevCommand: currentCommand,
  });
};

export default dispatch;
