import { promises as fs } from 'fs';
import path from 'path';

const dir = path.dirname(__dirname);

export const getDataFromFile = async (
  type: string
): Promise<Array<Person> | void> => {
  try {
    const data = await fs.readFile(path.join(dir, 'data', `${type}.json`));
    if (typeof data.toString() === 'string') {
      return JSON.parse(data.toString());
    }
  } catch (error) {
    console.log('Error reading file ', error);
    throw error;
  }
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
    console.log('Error writing to file ', error);
    throw error;
  }
};

export default {
  getDataFromFile,
  writeDataToFile,
};
