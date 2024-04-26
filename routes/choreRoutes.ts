import { Router } from 'express';
import choresController from '../controllers/choresController';

const router = Router();

router.get('/', choresController.getChores);

export default module.exports = router;
