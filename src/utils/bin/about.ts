import { getBio } from '../../api';

export const about = async (args: string[]): Promise<string> => {
  const about = await getBio()
  // console.dir({about})
  return about
};
