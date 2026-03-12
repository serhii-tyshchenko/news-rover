import express from 'express';
import packageJson from '../../package.json' with { type: 'json' };

const router = express.Router();

router.get('/', (_, res) =>
  res.status(200).send({
    message: `Welcome to the News Rover API v.${packageJson.version}!`,
  }),
);

export default router;
