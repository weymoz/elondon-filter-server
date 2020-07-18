"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentfulReqest = void 0;
var axios_1 = __importDefault(require("axios"));
var config_1 = require("../config");
axios_1.default.interceptors.request.use(function (config) {
    config_1.logger.info('Request: ');
    config_1.logger.info(config);
    return config;
}, function (error) {
    config_1.logger.error(error);
    return Promise.reject(error);
});
axios_1.default.interceptors.response.use(function (response) {
    // logger.info('Response:');
    // logger.info(response);
    return response;
}, function (error) {
    config_1.logger.error(error);
    return Promise.reject(error);
});
var request = function (baseUrl, baseParams) { return function (method, url, params, data) {
    return axios_1.default({
        url: "" + baseUrl + url,
        params: __assign(__assign({}, baseParams), params),
        data: data,
    });
}; };
if (!config_1.CONTENTFUL_API_BASE_URL) {
    var msg = 'Contentful API base URL not set';
    config_1.logger.error(msg);
    throw new Error(msg);
}
if (!config_1.CONTENTFUL_API_BASE_PARAMS.access_token) {
    var msg = 'Contentful API base not not set';
    config_1.logger.error(msg);
    throw new Error(msg);
}
exports.contentfulReqest = request(config_1.CONTENTFUL_API_BASE_URL, config_1.CONTENTFUL_API_BASE_PARAMS);
//# sourceMappingURL=http-client.js.map