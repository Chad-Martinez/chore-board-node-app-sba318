import { Router } from 'express';
import peopleController from '../controllers/peopleController';

const router = Router();

router.get('/', peopleController.getAllPeople);

router.post('/', peopleController.addPerson);

export default module.exports = router;
