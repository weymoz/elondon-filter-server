import { EscortIndexed, FilterReqParams, EscortsFilterQuery } from './../types';
import { EscortsData, EscortData, Escort } from '../types';
import express from 'express';
import { logger } from '../config';
import { contentfulReqest } from '../sevices/http-client';
import Escorts from '../db/models/escorts';
import EscortsController from '../controllers/EscortsController';

const router = express.Router();
const escortsController = new EscortsController(contentfulReqest, Escorts);

router.get('/', (req, res) => {
  res.json({ route: 'index all contentful entities' });
});

router.get('/all', async (req, res) => {
  await escortsController.fetchAndUpdate();
  res.end();
});

router.get('/filter', async (req, res) => {
  logger.info(req.query);
  const filtered = await escortsController.getFiltered(
    (req.query as unknown) as EscortsFilterQuery
  );
  res.json(filtered);
});

export default router;
