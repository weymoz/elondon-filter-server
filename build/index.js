"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./config/index");
var express_1 = __importDefault(require("express"));
var config_1 = require("./config");
require("./db/connect");
var escorts_1 = __importDefault(require("./routes/escorts"));
var app = express_1.default();
app.use('/escorts', escorts_1.default);
app.get('/', function (req, res) {
    res.json({
        route: 'elondon helpers',
    });
});
app.listen(config_1.PORT, function () {
    index_1.logger.info('Server is listening on port: ' + config_1.PORT);
});
//# sourceMappingURL=index.js.map