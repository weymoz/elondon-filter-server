import { produce } from 'immer';
import {
  APIRequest,
  EscortsData,
  EscortData,
  EscortIndexed,
  ReqParams,
  FilterReqParams,
  EscortDataModified,
  EscortsFilterQuery,
} from './../types';
import { Model, Document, FilterQuery } from 'mongoose';
import { logger } from '../config';
import Escorts from '../db/models/escorts';

export interface IEscortsController {
  getData: () => Promise<EscortData[]>;
  formatData: (d: EscortDataModified[]) => EscortIndexed[];
  saveData: (e: EscortIndexed[]) => Promise<void> | undefined;
}

export default class EscortsController implements IEscortsController {
  constructor(
    private apiRequest: APIRequest<EscortsData<EscortData>>,
    private escortsModel?: Model<Document, {}>
  ) {}

  async fetchAndUpdate() {
    try {
      const apiResponse = await this.getData();
      if (apiResponse.length > 0) {
        return await this.saveData(this.formatData(apiResponse));
      }
    } catch (e) {
      logger.error(e);
    }
  }

  async getData() {
    return new Promise(
      async (resolve: (d: EscortDataModified[]) => unknown) => {
        let allEscortsData: EscortDataModified[] = [];
        let total = 1;
        let skip = 0;
        const limit = 100;

        while (allEscortsData.length < total) {
          const { data } = await this.apiRequest('get', '/entries', {
            content_type: 'escorts',
            limit,
            skip,
          });

          const data_v2 = this.addImageUrls(data);

          allEscortsData = [...allEscortsData, ...data_v2.items];
          total = data.total || 0;
          skip += limit;
        }

        resolve(allEscortsData);
      }
    );
  }

  private addImageUrls(
    data: EscortsData<EscortData>
  ): EscortsData<EscortDataModified> {
    const data_v2 = produce(data, (draftData) => {
      const images = draftData.includes?.Asset;

      draftData.items.forEach((item) => {
        const imageId =
          item.fields?.photos && item.fields.photos.length > 0
            ? item.fields.photos[0].sys.id
            : undefined;
        let foundImageUrl: string | undefined;
        if (imageId) {
          foundImageUrl = images.find((image) => image.sys.id === imageId)
            ?.fields.file.url;
        }
        (item as EscortDataModified).added = {
          imageUrl: foundImageUrl ? `https:${foundImageUrl}` : undefined,
        };
      });
    });
    return data_v2 as EscortsData<EscortDataModified>;
  }

  /**
   * Convert data received from api to format that fits to be saved to DB
   * @param items Array of escort data received from API with added imaeUrl information
   */
  formatData(items: EscortDataModified[]): EscortIndexed[] {
    return items.map(
      ({
        sys: { id },
        fields: { title, rates, location, services, hair, bodyType, bust },
        added: { imageUrl },
      }) => ({
        id,
        title: title?.toLowerCase(),
        location: location?.name,
        services,
        hair,
        bodyType,
        bust,
        incallRate: rates?.gbp['1_One hour']?.incall,
        outcallRate: rates?.gbp['1_One hour']?.outcall,
        imageUrl,
      })
    );
  }

  saveData(data: EscortIndexed[]): Promise<void> | undefined {
    return this.escortsModel
      ?.bulkWrite(
        data.map((escort) => ({
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
      });
  }

  async getFiltered(query: EscortsFilterQuery) {
    const mongoQuery = this.composeQuery(query);
    const results = await Escorts.find(mongoQuery).exec();
    return results;
  }

  composeQuery(query: EscortsFilterQuery) {
    const { location } = query;

    //Compose regular expressions array to search in multiple locations
    const locationRegexps = location.map((loc) => new RegExp(loc, 'i'));

    return {
      location: {
        $in: locationRegexps,
      },
    };
  }
}
