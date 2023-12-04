import express from 'express';
import SubCategoriasController from '../controllers/SubCategoriasController.js';

const router = express.Router();

router.get('/', SubCategoriasController.getAll);
router.get('/:id', SubCategoriasController.getOne);
router.get('/:id/productos', SubCategoriasController.getOneWithProducts);
router.post('/', SubCategoriasController.create);
router.delete('/:id', SubCategoriasController.remove);
router.put('/:id', SubCategoriasController.update);

export default router;
