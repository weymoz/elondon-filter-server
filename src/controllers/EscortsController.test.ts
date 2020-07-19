import { logger } from './../config/index';
import EscortsController, { IEscortsController } from './EscortsController';
import { contentfulReqest } from '../sevices/http-client';
import { axios } from '../sevices/http-client';
import MockAdapter from 'axios-mock-adapter';

const getItems = (c: number, n: number) =>
  new Array(n).fill(0).map(() => ({ item: c++ }));
const responses = [
  { total: 155, items: getItems(1, 100) },
  { total: 155, items: getItems(101, 50) },
  { total: 155, items: getItems(151, 5) },
];

describe('EscortsController', () => {
  const apiUrl =
    'https://cdn.contentful.com/spaces/rfr9tdku11ho/environments/master/entries';
  let escortsController = new EscortsController(contentfulReqest);

  describe('getAllEscortsData()', () => {
    let fakeAPI = new MockAdapter(axios);
    fakeAPI.onGet(apiUrl).reply(() => [200, responses.shift()]);

    test('Should return array of expected length', async () => {
      const data = await escortsController.getAllEscortsData();
      expect(data.length).toBe(155);
    });
  });
});
