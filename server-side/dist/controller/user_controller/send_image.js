"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_manager_1 = __importDefault(require("../../utils/managers/image_manager"));
const conversation_model_1 = __importDefault(require("../../model/conversation_model"));
const groups_model_1 = __importDefault(require("../../model/groups_model"));
const socket_manager_1 = require("../../sockets/socket_manager");
async function sendImage(req, res, next) {
    const user_name = req.session.userData.userName;
    const media = req.body.media;
    const conversation_id = req.body.conversation_id;
    const sender_id = req.session.userData.userId;
    const sender_image_path = req.body.sender_image_path;
    const conversation_type = req.body.type;
    // check if the body is not null
    async function sendDataToCloudinary() {
        const mediaLinks = [];
        for (let index = 0; index < media.length; index++) {
            if (media[index].match(/^data:([A-Za-z-+/]+);base64,(.+)$/)) {
                await image_manager_1.default.uploadImage(media[index], conversation_id).then((data) => {
                    mediaLinks.push(data.url);
                });
            }
        }
        return mediaLinks;
    }
    try {
        sendDataToCloudinary().then(async (value) => {
            if (value.length !== 0) {
                if (conversation_type === 'contact') {
                    const mediaMessage = [];
                    for (let index = 0; index < value.length; index++) {
                        mediaMessage.push({ sender_id: sender_id, message: value[index], sender_image_path: sender_image_path, });
                        socket_manager_1.socketManager.imageSocket(conversation_id, { sender_id: sender_id, message: value[index], sender_image_path: sender_image_path, });
                    }
                    await conversation_model_1.default.findOneAndUpdate({ conversation_id: conversation_id }, { $push: { media: { $each: value }, messages: { $each: mediaMessage } } }, { new: true });
                }
                else {
                    const mediaMessage = [];
                    for (let index = 0; index < value.length; index++) {
                        mediaMessage.push({ sender_id: sender_id, message: value[index], sender_image_path: sender_image_path, sender_name: req.session.userData.userName });
                        socket_manager_1.socketManager.imageSocket(conversation_id, { sender_id: sender_id, message: value[index], sender_image_path: sender_image_path, sender_name: req.session.userData.userName });
                    }
                    await groups_model_1.default.findOneAndUpdate({ conversation_id: conversation_id }, { $push: { media: { $each: value }, messages: { $each: mediaMessage } } }, { new: true }).then(val => {
                        return val;
                    });
                }
                res.status(201).json({ message: "images added successfully", images: value });
            }
            else {
                res.status(500).json({ message: "There is an error , try again" });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "There is an error , try again", error });
    }
}
exports.default = sendImage;
//# sourceMappingURL=send_image.js.map