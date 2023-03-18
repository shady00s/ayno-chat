"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../model/user_model"));
const search_user = (req, res) => {
    const contactName = req.query.contactName;
    const user_id = req.session.userData.userId;
    let isFriend = false;
    let conversation_id;
    try {
        user_model_1.default.findOne({ name: new RegExp('^' + contactName + '$', "i") }).select(["-password", '-messages', '-groups']).then(async (searchResult) => {
            // check if the user found
            if (searchResult !== null) {
                let userFriends = await user_model_1.default.findById(user_id).select(["-password", '-messages', '-groups']).then(friendsData => friendsData);
                for (let index = 0; index < userFriends.friends.length; index++) {
                    if (userFriends.friends[index].equals(searchResult.id)) {
                        isFriend = true;
                    }
                }
                if (isFriend === true) {
                    for (let index = 0; index < userFriends.conversations.length; index++) {
                        if (userFriends.conversations[index].contact_Id.equals(searchResult.id)) {
                            conversation_id = userFriends.conversations[index].conversation_Id;
                        }
                    }
                    res.status(200).json({
                        message: "user found",
                        body: {
                            id: searchResult.id,
                            name: searchResult.name,
                            profileImagePath: searchResult.profileImagePath,
                            isFriend,
                            conversation_id
                        }
                    });
                }
                else {
                    res.status(200).json({
                        message: "user found",
                        body: {
                            id: searchResult.id,
                            name: searchResult.name,
                            profileImagePath: searchResult.profileImagePath,
                            isFriend,
                        }
                    });
                }
            }
            else {
                res.status(204).json({
                    message: "user not found"
                });
            }
        });
    }
    catch (error) {
        res.status(400).json({
            message: "error",
            body: error
        });
    }
};
exports.default = search_user;
//# sourceMappingURL=search_user.js.map