import express from 'express';
import PagosController from '../controllers/PagosController.js';

const router = express.Router();

router.post('/', PagosController.create);
router.get('/', PagosController.getAll);
router.get('/:id', PagosController.getOne);
router.delete('/:id', PagosController.remove);
router.put('/:id', PagosController.update);

export default router;
