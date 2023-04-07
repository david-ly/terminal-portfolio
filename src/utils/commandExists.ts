import * as bin from './bin';

const bin_cmds = Object.keys(bin);
const commands = ['clear', ...bin_cmds];

export const commandExists = (expr: string) => {
  const cmd = expr.split(' ')[0];
  return commands.includes(cmd);
};
