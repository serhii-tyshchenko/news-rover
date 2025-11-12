const express = require('express');

const providersController = require('../controllers/providers');
const rssController = require('../controllers/rss');

const router = express.Router();

router.get('/', providersController.list);

router.get('/:id', providersController.getById);

router.get('/:id/news', rssController.providerNews);

module.exports = router;
