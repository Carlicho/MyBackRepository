import express from 'express';
import RolesController from '../controllers/RolesController.js';

const router = express.Router();

router.get('/', RolesController.getAll);
router.get('/:id', RolesController.getOne);
router.post('/', RolesController.create);
router.delete('/:id', RolesController.remove);
router.put('/:id', RolesController.update);

export default router;
