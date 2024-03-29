"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../model/groups_model"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_validator_1 = require("express-validator");
function getGroupMessages(req, res) {
    const conversation_id = req.query.conversation_id;
    const pageNumber = req.query.page || 0;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const page = parseInt(pageNumber.toString());
            const perPage = 50;
            const skip = (page - 1) * perPage;
            groups_model_1.default.aggregate([
                { $match: { conversation_id: new mongoose_1.default.Types.ObjectId(conversation_id.toString()) } },
                { $project: { messages: { $slice: ["$messages", skip, perPage] } } },
                { $unwind: "$messages" },
                { $sort: { "messages.date": 1 } }
            ]).exec((error, result) => {
                if (error) {
                    res.status(500).json({
                        message: "there is an error",
                        error
                    });
                }
                else {
                    res.status(200).json({
                        message: "succssess",
                        pageNumber: page,
                        conversations: result
                    });
                }
            });
        }
        catch (error) {
            res.status(500).json({
                message: "therer is an error",
                error
            });
        }
    }
    else {
        res.status(500).json({ message: "there is errors", errors });
    }
}
exports.default = getGroupMessages;
//# sourceMappingURL=group_messages.js.map