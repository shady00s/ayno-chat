"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const groups_model = new mongoose_1.default.Schema({
    conversation_id: { type: mongoose_1.default.Schema.Types.ObjectId },
    conversation_name: { type: String, required: true },
    media: [{ type: String, default: [] }],
    members_ids: [{ type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "UsersModel" }],
    messages: [{
            votingData: {
                voteId: { type: mongoose_1.default.Schema.Types.ObjectId },
                voteQuestion: { type: String },
                voteChoices: [{ voteId: { type: String }, voteData: { type: String } }],
                voteParticepents: [{ particepentChoice: { type: String }, prticipentId: { type: mongoose_1.default.Types.ObjectId }, default: [] }]
            },
            message: { type: String, required: true },
            sender_id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "UsersModel" },
            sender_image_path: { type: String, required: true },
            seen: { type: Boolean, default: false },
            delivered: { type: Boolean, default: false },
            date: { type: Date, default: Date.now() },
            sender_color: { type: String },
            sender_name: { type: String },
            type: { type: String, enum: ['message', 'vote'], default: 'message' }
        }],
    message_colors: [{ id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "UsersModel" }, color: { type: String } }]
});
exports.default = mongoose_1.default.model('groups_collection', groups_model);
//# sourceMappingURL=groups_model.js.map