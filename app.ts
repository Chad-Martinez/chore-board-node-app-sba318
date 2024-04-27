import express, { Request, Response, NextFunction } from 'express';
import { engine } from 'express-handlebars';
import peopleRoutes from './routes/peopleRoutes';
import choreRoutes from './routes/choreRoutes';
import ErrorResponse from './classes/HttpResponseError';
import { getDataFromFile } from './helpers/fileHelpers';

const app = express();
const port: number = 3000;

app.use(express.json());

app.set('view engine', 'hbs');

app.engine(
  'hbs',
  engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    partialsDir: `${__dirname}/views/partials/`,
  })
);

app.use(express.static('public'));

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chores = (await getDataFromFile('chores')) as Array<Chore>;
    const people = (await getDataFromFile('people')) as Array<Person>;

    if (people && Array.isArray(people)) {
      const filteredPeople = people.filter((person: Person | undefined) => {
        if (!undefined && person && person.chores.length > 0) {
          return person;
        }
      });
      const selectOptions = {
        chores,
        people,
        filteredPeople,
      };
      res.render('main', {
        layout: 'index',
        options: selectOptions,
        listExists: true,
      });
    }
  } catch (error) {
    next(new ErrorResponse(500, 'Internal Server Error'));
  }
});

app.use('/api/people', peopleRoutes);
app.use('/api/chores', choreRoutes);

app.use(
  (
    error: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    console.error('Error handling middleware ', error);
    res.status(error.status || 500);
    res.json({ error: error.message });
  }
);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
