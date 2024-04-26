import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { promises as fs, readFile, writeFile } from 'fs';
import ErrorResponse from '../classes/HttpResponseError';
import { getDataFromFile, writeDataToFile } from '../helpers/fileHelpers';

const dir = path.dirname(__dirname);

const getAllPeople = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const people = await getDataFromFile('people');
    res.json(people);
  } catch (error) {
    if (error) {
      next(new ErrorResponse(500, 'Internal Server Error'));
    }
  }
};

const addPerson = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const person: Person = {
    id: Math.random().toString().slice(2),
    name,
    chores: [],
  };

  try {
    const people = (await getDataFromFile('people')) as Array<Person>;
    people.push(person);
    await writeDataToFile('people', people);
    console.log('File write successful');
    res.status(201).send({ id: person.id });
  } catch (error) {
    next(new ErrorResponse(500, 'Internal Server Error'));
  }
};

export default {
  getAllPeople,
  addPerson,
};
