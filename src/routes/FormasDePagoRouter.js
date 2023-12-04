import express from 'express';
import FormasDePagoController from '../controllers/FormasDePagoController.js';

const router = express.Router();

router.get('/', FormasDePagoController.getAll);
router.get('/:id', FormasDePagoController.getOne);
router.post('/', FormasDePagoController.create);
router.delete('/:id', FormasDePagoController.remove);
router.put('/:id', FormasDePagoController.update);

export default router;
