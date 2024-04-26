import { Router, Request, Response, NextFunction } from 'express';
import { readFile } from 'fs';
import path from 'path';
import ErrorResponse from '../classes/HttpResponseError';

const dir = path.dirname(__dirname);

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  readFile(path.join(dir, 'data', 'chores.json'), 'utf-8', (error, data) => {
    if (error) {
      next(new ErrorResponse(500, 'Internal Server Error'));
      console.log('File Read Error: ', error);
    } else {
      const chores = JSON.parse(data);
      console.log();
      res.json(data);
    }
  });
});
