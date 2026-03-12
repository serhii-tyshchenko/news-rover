import express from 'express';

import categoriesController from '../controllers/categories.ts';

const router = express.Router();

router.get('/', categoriesController.list);

router.get('/:id', categoriesController.getById);

export default router;
