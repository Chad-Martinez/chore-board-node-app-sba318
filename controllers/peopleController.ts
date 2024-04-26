import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs, { readFile, writeFile } from 'fs';
import ErrorResponse from '../classes/HttpResponseError';

const dir = path.dirname(__dirname);

const getAllPeople = (req: Request, res: Response, next: NextFunction) => {
  res.json({ id: '1', name: 'Chad' });
};

const addPerson = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const person: Person = {
    id: Math.random().toString().slice(2),
    name,
    chores: [],
  };

  readFile(`${dir}/data/people.json`, 'utf-8', (error, data) => {
    if (error) {
      next(new ErrorResponse(500, 'Internal Server Error'));
    } else {
      const people = JSON.parse(data);
      people.push(person);

      writeFile(`${dir}/data/people.json`, JSON.stringify(people), (error) => {
        if (error) {
          next(new ErrorResponse(500, 'Internal Server Error'));
        } else {
          console.log('File write successful');
          res.status(201).send({ id: person.id });
        }
      });
    }
  });
};

export default {
  getAllPeople,
  addPerson,
};
