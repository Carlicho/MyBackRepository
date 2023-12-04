import express from 'express';
import OrdenesProductosController from '../controllers/OrdenesProductosController.js';

const router = express.Router();

router.get('/', OrdenesProductosController.getAll);
router.get('/:id', OrdenesProductosController.getOne);
router.post('/', OrdenesProductosController.create);
router.delete('/:id', OrdenesProductosController.remove);
router.put('/:id', OrdenesProductosController.update);

export default router;
