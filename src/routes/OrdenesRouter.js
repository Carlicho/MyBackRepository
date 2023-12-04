import express from 'express';
import OrdenesController from '../controllers/OrdenesController.js';

const router = express.Router();

router.get('/', OrdenesController.getAll);
router.get('/:id', OrdenesController.getOne);
router.post('/', OrdenesController.create);
router.delete('/:id', OrdenesController.remove);
router.put('/:id', OrdenesController.update);

export default router;
