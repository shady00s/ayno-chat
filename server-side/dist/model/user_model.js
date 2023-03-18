"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    profileImagePath: { type: String, required: true },
    conversations: [{ conversation_Id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true }, contact_Id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "userModel" } }],
    groups: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "groups_collection" }],
    friends: [{ type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "userModel" }],
    friendRequests: [{ type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "userModel" }]
});
exports.default = mongoose_1.default.model('userModel', user_schema);
//# sourceMappingURL=user_model.js.map