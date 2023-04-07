import * as bin from './bin';

const bin_cmds = Object.keys(bin);

export const handleTabCompletion = (
  command: string,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const matching_cmds = bin_cmds.filter((entry) => entry.startsWith(command));

  if (matching_cmds.length === 1) setCommand(matching_cmds[0]);
};
