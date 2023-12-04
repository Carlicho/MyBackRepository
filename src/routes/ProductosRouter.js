import express from 'express';
import ProductosController from '../controllers/ProductosController.js';

const router = express.Router();

router.get('/', ProductosController.getAll);
router.get('/:id', ProductosController.getOne);
router.post('/', ProductosController.create);
router.delete('/:id', ProductosController.remove);
router.put('/:id', ProductosController.update);

export default router;
