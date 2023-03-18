"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_model_1 = __importDefault(require("../../model/conversation_model"));
const postMessageController = (req, res) => {
    const sender_id = req.session.userData.userId;
    const conversation_id = req.body.conversation_id;
    const message_content = req.body.message_content;
    try {
        conversation_model_1.default.findOneAndUpdate({ conversation_id: conversation_id }, { $push: { messages: { message: message_content, sender_id: sender_id, sender_image_path: req.session.userData.userProfilePath } } }, { new: true }).then(results => {
            res.status(201).json({ message: "succsses", body: results });
        });
    }
    catch (error) {
        res.status(500).json({ message: "error occured", error });
    }
};
exports.default = postMessageController;
//# sourceMappingURL=send_messages.js.map