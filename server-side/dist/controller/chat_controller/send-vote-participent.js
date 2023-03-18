"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../model/groups_model"));
function sendVoteParticipent(req, res) {
    const user_id = req.session.userData.userId;
    const conversation_id = req.body.conversation_id;
    const vote_id = req.body.voteId;
    const particepentChoice = req.body.participent_choice;
    groups_model_1.default.countDocuments({ conversation_id: conversation_id, "messages.votingData.voteId": vote_id, "messages.votingData.voteParticepents": { $elemMatch: { particepentChoice: particepentChoice, prticipentId: user_id } } }).then((val) => {
        console.log(val);
        if (val === 0) {
            groups_model_1.default.findOneAndUpdate({ conversation_id: conversation_id, "messages.votingData.voteId": vote_id }, { $push: { "messages.$.votingData.voteParticepents": { particepentChoice: particepentChoice, prticipentId: user_id } } }, { new: true }).then(val => {
                res.status(200).json({ message: "succssess", val });
            });
        }
    });
}
exports.default = sendVoteParticipent;
//# sourceMappingURL=send-vote-participent.js.map