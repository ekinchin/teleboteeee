// import { EventEmitter } from 'events';
// const eventer = new EventEmitter();
// eventer.on('/weather', botCommands['/weather'].handler);
// eventer.on('/start', botCommands['/start'].handler);
// eventer.on('/help', botCommands['/help'].handler);
// eventer.on('undefined', botCommands.undefined.handler);

const commands = {
  '/start': () => 'start command',
  '/help': () => 'help command',
  '/undefined': () => 'undefined command',
};

export default (command, payload) => (command in commands ? commands[command](payload) : commands['/undefined']());
