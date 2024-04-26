import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../classes/HttpResponseError';
import { getDataFromFile } from '../helpers/fileHelpers';

const getChores = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
