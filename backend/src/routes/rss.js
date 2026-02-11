const express = require('express');
const rssController = require('../controllers/rss');

const router = express.Router();

router.get('/', rssController.retrieve);

module.exports = router;
