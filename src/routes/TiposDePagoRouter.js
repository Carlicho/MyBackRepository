import express from 'express';
import TiposDePagoController from '../controllers/TiposDePagoController.js';

const router = express.Router();

router.get('/', TiposDePagoController.getAll);
router.get('/:id', TiposDePagoController.getOne);
router.post('/', TiposDePagoController.create);
router.delete('/:id', TiposDePagoController.remove);
router.put('/:id', TiposDePagoController.update);

export default router;
