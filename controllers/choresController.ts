import { Request, Response, NextFunction } from 'express';
import { readFile } from 'fs';
import path from 'path';
import ErrorResponse from '../classes/HttpResponseError';
import { getDataFromFile } from '../helpers/fileHelpers';

const getChores = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chores = await getDataFromFile('chores');
    res.json(chores);
  } catch (error) {
    next(new ErrorResponse(500, 'Internal Server Error'));
  }
};

export default {
  getChores,
};
