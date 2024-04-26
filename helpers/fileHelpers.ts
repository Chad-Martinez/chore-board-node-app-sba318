import { promises as fs } from 'fs';
import path from 'path';

const dir = path.dirname(__dirname);

export const getDataFromFile = async (
  type: string
): Promise<Array<Chore | Person>> => {
  const data = await fs.readFile(path.join(dir, 'data', `${type}.json`));
  return JSON.parse(data.toString());
};

export const writeDataToFile = async (
  type: string,
  content: Array<Person | Chore>
): Promise<void> => {
  try {
    await fs.writeFile(
      path.join(dir, 'data', `${type}.json`),
      JSON.stringify(content)
    );
  } catch (error) {
    console.log(error);
  }
};

export default {
  getDataFromFile,
  writeDataToFile,
};
