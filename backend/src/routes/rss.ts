import express from 'express';
import rssController from '../controllers/rss.ts';

const router = express.Router();

router.get('/', rssController.retrieve);

export default router;
