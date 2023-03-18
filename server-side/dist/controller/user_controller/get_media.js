"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_model_1 = __importDefault(require("../../model/conversation_model"));
const express_validator_1 = require("express-validator");
const getMediaContoller = (req, res) => {
    const conversation_id = req.query.conversation_id;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            conversation_model_1.default.findOne({ conversation_id }).then(conv => {
                if (conv !== null) {
                    res.status(200).json({ message: "succssess", body: conv.media });
                }
                else {
                    res.status(500).json({ message: "There is no conversation with this id" });
                }
            });
        }
        catch (e) {
            res.status(500).json({ message: "Error", body: e });
        }
    }
    else {
        res.status(500).json({ message: "conversation id is empty" });
    }
};
exports.default = getMediaContoller;
//# sourceMappingURL=get_media.js.map