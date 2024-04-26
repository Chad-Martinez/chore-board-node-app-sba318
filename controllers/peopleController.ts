import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../classes/HttpResponseError';
import { getDataFromFile, writeDataToFile } from '../helpers/fileHelpers';

const getAllPeople = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const people = await getDataFromFile('people');
    res.json(people);
  } catch (error) {
    if (error) {
      next(new ErrorResponse(500, 'Internal Server Error'));
    }
  }
};

const addPerson = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;
  const person: Person = {
    id: Math.random().toString().slice(2),
    name,
    chores: [],
  };

  try {
    const people: string | void = await getDataFromFile('people');
    if (typeof people === 'string') {
      const updatedPeople: Array<Person> = [person];
      if (people !== '') {
        updatedPeople.push(...JSON.parse(people));
      }
      await writeDataToFile('people', updatedPeople);
    }
    res.status(201).send({ id: person.id });
  } catch (error) {
    next(new ErrorResponse(500, 'Internal Server Error'));
  }
};

export default {
  getAllPeople,
  addPerson,
};
