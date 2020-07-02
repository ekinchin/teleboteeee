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

const commands = commandsLoad();
export default (command, payload) => (command in commands ? commands[command](payload) : commands['/undefined']());
