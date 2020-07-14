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

const getContext = (chatId) => {
  if (context.has(chatId)) {
    return context.get(chatId);
  }
  return {
    lastCommand: undefined,
    commandDone: false,
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
  const { chat } = message || undefined;
  const { from } = message || undefined;
  const { text } = message || undefined;
  const { location } = message || undefined;
  const command = type === 'bot_command' ? text.split(' ')[0].toLowerCase() : undefined;
  return {
    command,
    chat,
    from,
    text,
    location,
  };
}

const dispatch = async (data) => {
  const { command, ...payload } = parser(data);
  const contextId = getContext(payload.chat.id);
  const { lastCommand, commandDone } = contextId;
  let runCommand = '';
  if (command in commands) {
    runCommand = command;
  } else if (!command && !commandDone) {
    runCommand = lastCommand;
  } else {
    runCommand = '/undefined';
  }
  const result = await commands[runCommand].run(payload, contextId);
  context.set(payload.chat.id, {
    lastCommand: runCommand,
    ...result,
  });
};

export default dispatch;
