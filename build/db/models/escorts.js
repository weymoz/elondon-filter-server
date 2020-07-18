"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var escortSchema = new Schema({
    escortId: String,
    location: String,
    services: [String],
    hair: String,
    bodyType: String,
    bust: String,
    incallRate: String,
});
var Escorts = mongoose_1.default.model('Escort', escortSchema);
exports.default = Escorts;
//# sourceMappingURL=escorts.js.map