const express = require('express');
const { version } = require('../../package.json');

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).send({
    message: `Welcome to the News Rover API v.${version}!`,
  })
);

module.exports = router;
