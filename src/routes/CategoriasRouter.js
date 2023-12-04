import express from 'express';
import CategoriasController from '../controllers/CategoriasController.js';

const router = express.Router();

router.get('/', CategoriasController.getAll);
router.get('/:id', CategoriasController.getOne);
// ver si esta ruta es util mas adelante
router.get('/:id/productos', CategoriasController.getOneWithProducts);
router.post('/', CategoriasController.create);
router.delete('/:id', CategoriasController.remove);
router.put('/:id', CategoriasController.update);

export default router;
