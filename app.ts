import express, { Request, Response, NextFunction } from 'express';
import { engine } from 'express-handlebars';
import peopleRoutes from './routes/peopleRoutes';
import ErrorResponse from './classes/HttpResponseError';

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

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('main', { layout: 'index' });
});

app.use('/api/people', peopleRoutes);

app.use(
  (
    error: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    console.log('Error handling middleware ', error);
    res.status(error.status || 500);
    res.json({ error: error.message });
  }
);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
