import packageJson from '../../../package.json';
import * as bin from './index';

const ascii_name = `
 ____              _     _   _
|  _ \\  __ ___   _(_) __| | | |   _   _
| | | |/ _\` \\ \\ / / |/ _\` | | |  | | | |
| |_| | (_| |\\ V /| | (_| | | |__| |_| |
|____/ \\__,_| \\_/ |_|\\__,_| |_____\\__, |
                                  |___/`;
const gui_site = 'https://davidmacly.dev';
const my_email = 'david.ly@berkeley.edu';
const repo_url = 'https://github.com/david-ly/terminal-portfolio';

export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');

  return `Available commands:
${commands}

[tab]\t trigger completion.
[ctrl+l] clear terminal.
[ctrl+c] cancel command.`;
};

export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return 'guest';
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const gui = async (args: string[]): Promise<string> => {
  window.open(gui_site, '_self');

  return 'Opening GUI version...';
};

export const email = async (args: string[]): Promise<string> => {
  const mailto = `mailto:${my_email}`;
  window.open(mailto);

  return `Opening ${mailto}...`;
};

export const repo = async (args?: string[]): Promise<string> => {
  setTimeout(() => {
    window.open(repo_url, '_blank');
  }, 1000);

  return 'Opening repository...';
};

export const banner = (args?: string[]): string => {
  return `${ascii_name}
--
Type 'help' to see list of available commands.
`;
};
