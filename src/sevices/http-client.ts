import { EscortData, EscortsData } from './../types';
import axios, { AxiosPromise } from 'axios';
import {
  DEVELOPMENT,
  CONTENTFUL_API_BASE_URL,
  CONTENTFUL_API_BASE_PARAMS,
  logger,
} from '../config';
import { stringify } from 'querystring';

axios.interceptors.request.use(
  (config) => {
    logger.info('Request: ');
    logger.info(config);
    return config;
  },
  (error) => {
    logger.error(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // logger.info('Response:');
    // logger.info(response);
    return response;
  },
  (error) => {
    logger.error(error);
    return Promise.reject(error);
  }
);
type ReqParams = { [k: string]: string | number | undefined };

const request = <T>(baseUrl: string, baseParams: ReqParams) => (
  method: string,
  url: string,
  params: ReqParams,
  data?: any
) =>
  axios({
    url: `${baseUrl}${url}`,
    params: {
      ...baseParams,
      ...params,
    },
    data,
  }) as AxiosPromise<T>;

if (!CONTENTFUL_API_BASE_URL) {
  const msg = 'Contentful API base URL not set';
  logger.error(msg);
  throw new Error(msg);
}

if (!CONTENTFUL_API_BASE_PARAMS.access_token) {
  const msg = 'Contentful API base not not set';
  logger.error(msg);
  throw new Error(msg);
}

export const contentfulReqest = request<EscortsData>(
  CONTENTFUL_API_BASE_URL,
  CONTENTFUL_API_BASE_PARAMS
);
