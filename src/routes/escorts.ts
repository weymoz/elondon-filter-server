import { EscortIndexed } from './../types';
import { EscortsData, EscortData, Escort } from '../types';
import express from 'express';
import { logger } from '../config';
import { contentfulReqest } from '../sevices/http-client';
import Escorts from '../db/models/escorts';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ route: 'index all contentful entities' });
});

router.get('/all', async (req, res) => {
  let allEscortsData: EscortData[] = [];
  let total = 1;
  let skip = 0;
  const limit = 100;

  while (allEscortsData.length < total) {
    const { data } = await contentfulReqest('get', '/entries', {
      content_type: 'escorts',
      limit,
      skip,
    });

    allEscortsData = [...allEscortsData, ...data.items];
    total = data.total || 0;
    skip += limit;
  }

  if (allEscortsData && allEscortsData.length > 0) {
    const allEscorts = getAllEscorts(allEscortsData);
    Escorts.bulkWrite(
      allEscorts.map((escort) => ({
        updateOne: {
          filter: { escortId: escort.id },
          update: { $set: escort },
          upsert: true,
        },
      }))
    )
      .then((res) => {
        logger.info('All escorts upserted');
        logger.info(res);
      })
      .catch((err) => {
        logger.info('Error upserting all escorts');
        logger.info(err);
      })
      .finally(() => res.end());
  }
});

function getAllEscorts(items: EscortData[]): EscortIndexed[] {
  return items.map(
    ({
      sys: { id },
      fields: { rates, location, services, hair, bodyType, bust },
    }) => ({
      id,
      location: location?.name,
      services,
      hair,
      bodyType,
      bust,
      incallRate: rates?.gbp['1_One hour']?.incall,
    })
  );
}

export default router;
