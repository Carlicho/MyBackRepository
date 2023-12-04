import express from 'express';
import EmisorasDeTarjetasController from '../controllers/EmisorasDeTarjetasController.js';

const router = express.Router();

router.get('/', EmisorasDeTarjetasController.getAll);
router.get('/:id', EmisorasDeTarjetasController.getOne);
router.post('/', EmisorasDeTarjetasController.create);
router.delete('/:id', EmisorasDeTarjetasController.remove);
router.put('/:id', EmisorasDeTarjetasController.update);

export default router;
