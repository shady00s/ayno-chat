"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chat_schema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose_1.default.Schema.Types.ObjectId, required: true }],
    groups: [{ type: mongoose_1.default.Schema.Types.ObjectId, required: true }],
});
exports.default = mongoose_1.default.model('chatModel', chat_schema);
//# sourceMappingURL=user_model.js.map