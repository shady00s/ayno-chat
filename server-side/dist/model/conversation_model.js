"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const conversation_schema = new mongoose_1.default.Schema({
    conversation_id: { type: mongoose_1.default.Schema.Types.ObjectId },
    media: [{ type: String, default: [] }],
    messages: [{
            message: { type: String, required: true },
            sender_id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "UsersModel" },
            sender_image_path: { type: String, required: true },
            seen: { type: Boolean, default: false },
            delivered: { type: Boolean, default: false },
            date: { type: Date, default: Date.now() },
        }
    ],
    members_ids: [{ type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "UsersModel" }],
});
exports.default = mongoose_1.default.model('conversation_collection', conversation_schema);
//# sourceMappingURL=conversation_model.js.map