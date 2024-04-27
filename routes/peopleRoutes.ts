import { Router } from 'express';
import peopleController from '../controllers/peopleController';

const router = Router();

router.get('/', peopleController.getAllPeople);

router.post('/', peopleController.addPerson);

router.get('/:name', peopleController.getPersonByName);

router.put('/', peopleController.updatePerson);

export default module.exports = router;
