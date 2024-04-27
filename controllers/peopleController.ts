import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../classes/HttpResponseError';
import { getDataFromFile, writeDataToFile } from '../helpers/fileHelpers';

export const getAllPeople = async (
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

export const getPersonByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.params;
    const people: Array<Person> | void = await getDataFromFile('people');
    if (people) {
      const person = people.find(
        (person: Person) => person.name.toLowerCase() === name.toLowerCase()
      );

      person ? res.json({ name: person.name }) : res.json({ name: '' });
    }
  } catch (error) {
    if (error) {
      next(new ErrorResponse(500, 'Internal Server Error'));
    }
  }
};

export const addPerson = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;
  if (name === '') next(new ErrorResponse(422, 'Name Required'));

  const person: Person = {
    id: Math.random().toString().slice(2),
    name,
    chores: [],
  };

  try {
    const people: Array<Person> | void = await getDataFromFile('people');
    if (people) {
      const isDuplicate: Person | undefined = people.find(
        (person: Person) => person.name.toLowerCase() === name.toLowerCase()
      );
      if (isDuplicate)
        next(new ErrorResponse(422, 'Person is already on the board'));

      people.push(person);

      await writeDataToFile('people', people);
      res.status(201).json({ id: person.id });
    }
  } catch (error) {
    next(new ErrorResponse(500, 'Internal Server Error'));
  }
};

export const updatePerson = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req.body);
  const { id, name, chores } = req.body.person;
  try {
    const people: Array<Person> | void = await getDataFromFile('people');

    if (people) {
      const person = people.find((person: Person) => person.id == id);

      if (!person) return next(new ErrorResponse(404, 'Cannot locate person'));
      person.id = id;
      person.name = name;
      person.chores = [...chores];

      await writeDataToFile('people', people);
      res.status(200).json({ person: person });
    }
  } catch (error) {
    next(new ErrorResponse(500, 'Internal Server Error'));
  }
};

export default {
  getAllPeople,
  getPersonByName,
  addPerson,
  updatePerson,
};
