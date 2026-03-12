import express from 'express';

import providersController from '../controllers/providers.ts';
import rssController from '../controllers/rss.ts';

const router = express.Router();

router.get('/', providersController.list);

router.get('/:id', providersController.getById);

router.get('/:id/news', rssController.providerNews);

export default router;
