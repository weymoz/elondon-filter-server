import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

export const ENV = process.env.NODE_ENV || 'development';
export const DEVELOPMENT = ENV === 'development';

export const PORT = process.env.PORT || '5000';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: true,
});

export const MONGODB_CONNECT_URL =
  ENV === 'production'
    ? process.env.MONGODB_CONNECT_URL
    : process.env.MONGO_CONNECT_URL_DEV;

export const CONTENTFUL_API_BASE_URL = process.env.CONTENTFUL_API_BASE_URL;
export const CONTENTFUL_API_BASE_PARAMS = {
  access_token: process.env.CONTENTFUL_API_ACCESS_TOKEN,
};
