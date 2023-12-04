import express from 'express';
import EntidadesFinancierasController from '../controllers/EntidadesFinancierasController.js';

const router = express.Router();

router.get('/', EntidadesFinancierasController.getAll);
router.get('/:id', EntidadesFinancierasController.getOne);
router.post('/', EntidadesFinancierasController.create);
router.delete('/:id', EntidadesFinancierasController.remove);
router.put('/:id', EntidadesFinancierasController.update);

export default router;
