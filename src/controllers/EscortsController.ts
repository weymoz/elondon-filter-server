import { APIRequest, EscortsData, EscortData } from './../types';

export interface IEscortsController {
  getAllEscortsData: () => Promise<EscortData[]>;
}

export default class EscortsController implements IEscortsController {
  constructor(private apiRequest: APIRequest<EscortsData>) {}
  /**
   * Get all escorts data from contentfull API
   */
  async getAllEscortsData() {
    return new Promise(async (resolve: (d: EscortData[]) => unknown) => {
      let allEscortsData: EscortData[] = [];
      let total = 1;
      let skip = 0;
      const limit = 100;

      while (allEscortsData.length < total) {
        const { data } = await this.apiRequest('get', '/entries', {
          content_type: 'escorts',
          limit,
          skip,
        });

        allEscortsData = [...allEscortsData, ...data.items];
        total = data.total || 0;
        skip += limit;
      }

      resolve(allEscortsData);
    });
  }
}
