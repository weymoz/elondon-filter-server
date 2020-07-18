"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("../config");
var http_client_1 = require("../sevices/http-client");
var escorts_1 = __importDefault(require("../db/models/escorts"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    res.json({ route: 'index all contentful entities' });
});
router.get('/all', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allEscortsData, total, skip, limit, data, allEscorts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                allEscortsData = [];
                total = 1;
                skip = 0;
                limit = 100;
                _a.label = 1;
            case 1:
                if (!(allEscortsData.length < total)) return [3 /*break*/, 3];
                return [4 /*yield*/, http_client_1.contentfulReqest('get', '/entries', {
                        content_type: 'escorts',
                        limit: limit,
                        skip: skip,
                    })];
            case 2:
                data = (_a.sent()).data;
                allEscortsData = __spreadArrays(allEscortsData, data.items);
                total = data.total || 0;
                skip += limit;
                return [3 /*break*/, 1];
            case 3:
                if (allEscortsData && allEscortsData.length > 0) {
                    allEscorts = getAllEscorts(allEscortsData);
                    escorts_1.default.bulkWrite(allEscorts.map(function (escort) { return ({
                        updateOne: {
                            filter: { escortId: escort.id },
                            update: { $set: escort },
                            upsert: true,
                        },
                    }); }))
                        .then(function (res) {
                        config_1.logger.info('All escorts upserted');
                        config_1.logger.info(res);
                    })
                        .catch(function (err) {
                        config_1.logger.info('Error upserting all escorts');
                        config_1.logger.info(err);
                    })
                        .finally(function () { return res.end(); });
                }
                return [2 /*return*/];
        }
    });
}); });
function getAllEscorts(items) {
    return items.map(function (_a) {
        var _b;
        var id = _a.sys.id, _c = _a.fields, rates = _c.rates, location = _c.location, services = _c.services, hair = _c.hair, bodyType = _c.bodyType, bust = _c.bust;
        return ({
            id: id,
            location: location === null || location === void 0 ? void 0 : location.name,
            services: services,
            hair: hair,
            bodyType: bodyType,
            bust: bust,
            incallRate: (_b = rates === null || rates === void 0 ? void 0 : rates.gbp['1_One hour']) === null || _b === void 0 ? void 0 : _b.incall,
        });
    });
}
exports.default = router;
//# sourceMappingURL=escorts.js.map