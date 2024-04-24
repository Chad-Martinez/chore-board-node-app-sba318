import express, { Request, Response, NextFunction } from 'express';

import { engine } from 'express-handlebars';

const app = express();
const port: number = 3000;

app.set('view engine', 'hbs');

app.engine(
  'hbs',
  engine({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
  })
);

app.use(express.static('public'));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('landing hit');
  res.render('main', { layout: 'index' });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
