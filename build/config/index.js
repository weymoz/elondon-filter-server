"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENTFUL_API_BASE_PARAMS = exports.CONTENTFUL_API_BASE_URL = exports.MONGODB_CONNECT_URL = exports.logger = exports.PORT = exports.DEVELOPMENT = exports.ENV = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pino_1 = __importDefault(require("pino"));
dotenv_1.default.config();
exports.ENV = process.env.NODE_ENV || 'development';
exports.DEVELOPMENT = exports.ENV === 'development';
exports.PORT = process.env.PORT || '5000';
exports.logger = pino_1.default({
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: true,
});
exports.MONGODB_CONNECT_URL = exports.ENV === 'production'
    ? process.env.MONGODB_CONNECT_URL
    : process.env.MONGO_CONNECT_URL_DEV;
exports.CONTENTFUL_API_BASE_URL = process.env.CONTENTFUL_API_BASE_URL;
exports.CONTENTFUL_API_BASE_PARAMS = {
    access_token: process.env.CONTENTFUL_API_ACCESS_TOKEN,
};
//# sourceMappingURL=index.js.map