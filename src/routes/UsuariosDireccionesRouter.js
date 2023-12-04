import express from 'express';
import UsuariosDireccionesController from '../controllers/UsuariosDireccionesController.js';

const router = express.Router();

router.get('/', UsuariosDireccionesController.getAll);
router.get('/:id', UsuariosDireccionesController.getOne);
router.post('/', UsuariosDireccionesController.create);
router.delete('/:id', UsuariosDireccionesController.remove);
router.put('/:id', UsuariosDireccionesController.update);

export default router;
