import { logger } from './../config/index';
import EscortsController, { IEscortsController } from './EscortsController';
import { contentfulReqest } from '../sevices/http-client';
import { axios } from '../sevices/http-client';
import MockAdapter from 'axios-mock-adapter';

const getItems = (c: number, n: number) =>
  new Array(n).fill(0).map(() => ({ item: c++ }));
const total = 150;

describe('EscortsController#getAllEscortsData()', () => {
  const apiUrl =
    'https://cdn.contentful.com/spaces/rfr9tdku11ho/environments/master/entries';
  let escortsController: IEscortsController;
  let fakeAPI: MockAdapter;

  beforeEach(() => {
    const responses = [
      { total, items: getItems(1, 100) },
      { total, items: getItems(101, 50) },
    ];
    escortsController = new EscortsController(contentfulReqest);
    fakeAPI = new MockAdapter(axios);
    fakeAPI.onGet(apiUrl).reply(() => [200, responses.shift()]);
  });

  test('Should return array of expected length', async () => {
    const data = await escortsController.getData();
    expect(data.length).toBe(total);
  });

  test('Output should contain expected value', async () => {
    const data = await escortsController.getData();
    const expected = { item: 3, added: { imageUrl: undefined } };
    expect(data[2]).toEqual(expected);
  });
});
