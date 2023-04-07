import themes from '../../../themes.json';

const cmd_help = `Usage: theme [arg]
Args:
  - ls: list all themes
  - set: set a theme
  - random: set a random theme

Example:
  theme ls # to list all themes
  theme set Gruvbox # to set a theme`;

export const theme = async (
  args: string[],
  callback?: (value: string) => string,
): Promise<string> => {
  if (args.length === 0) return cmd_help;

  switch (args[0]) {
    case 'ls':
      let result = themes.map((theme) => theme.name.toLowerCase()).join(', ');
      result += '\n\n';
      result += `You can preview all these themes <a href="https://github.com/m4tt72/terminal/tree/master/docs/themes">in the docs</a>`;

      return result;
    case 'set':
      const selected = args[1];

      return callback(selected);
    case 'random':
      const random = themes[Math.floor(Math.random() * themes.length)];

      return callback(random.name.toLowerCase());
  }
};
