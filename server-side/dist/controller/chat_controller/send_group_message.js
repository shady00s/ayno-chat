"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../model/groups_model"));
const socket_manager_1 = require("../../sockets/socket_manager");
function sendGroupMessage(req, res) {
    const group_id = req.body.conversation_id;
    const message_content = req.body.message_content;
    const sender_id = req.session.userData.userId;
    const sender_image_path = req.body.sender_image_path;
    const sender_name = req.body.sender_name;
    socket_manager_1.socketManager.groupSendMessageSocket(group_id, {
        conversation_id: group_id,
        sender_id,
        sender_image_path,
        sender_name,
        message: message_content
    });
    groups_model_1.default.findOneAndUpdate({ conversation_id: group_id }, { $push: { messages: { message: message_content, sender_id: sender_id, sender_image_path: sender_image_path, sender_name: sender_name } } }, { new: true }).then(val => {
        res.status(200).json({ message: "succssess", body: val });
    });
}
exports.default = sendGroupMessage;
//# sourceMappingURL=send_group_message.js.map