import { EscortData, EscortsData, ReqParams } from './../types';
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
    logger.debug('Request: ');
    logger.debug(config);
    return config;
  },
  (error) => {
    logger.error(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    logger.trace('Response:');
    logger.trace(response);
    return response;
  },
  (error) => {
    logger.error(error);
    return Promise.reject(error);
  }
);

const request = <T>(baseUrl: string, baseParams?: ReqParams) => (
  method: string,
  url: string,
  params: ReqParams,
  data?: any
) =>
  axios({
    url: `${baseUrl}${url}`,
    params: {
      ...baseParams,
      ...(params || {}),
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

const contentfulReqest = request<EscortsData>(
  CONTENTFUL_API_BASE_URL,
  CONTENTFUL_API_BASE_PARAMS
);

export { axios, contentfulReqest };
