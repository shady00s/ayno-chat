"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chat_schema = new mongoose_1.default.Schema({
    message: { type: String, required: true },
    sender_Id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "UsersModel" },
    recivers_ids: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "UsersModel" },
    date: { type: Date, default: Date.now() },
    seen: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false }
});
exports.default = mongoose_1.default.model('chatModel', chat_schema);
//# sourceMappingURL=chat_model.js.map