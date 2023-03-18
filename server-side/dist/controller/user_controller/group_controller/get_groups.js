"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../../model/user_model"));
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
function getGroups(req, res) {
    const user_id = req.session.userData.userId;
    // get groups
    user_model_1.default.findById(user_id).then(userData => {
        if (userData !== null) {
            const groups = [];
            for (let index = 0; index < userData.groups.length; index++) {
                let ids = userData.groups[index]._id.toString();
                groups.push(ids);
            }
            if (userData !== null) {
                groups_model_1.default.find({ conversation_id: { $in: [...groups] } }).then(groups => {
                    if (groups !== null) {
                        res.status(200).json({ message: "succssess", body: groups });
                    }
                });
            }
        }
    });
}
exports.default = getGroups;
//# sourceMappingURL=get_groups.js.map