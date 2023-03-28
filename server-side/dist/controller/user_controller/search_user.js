"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../model/user_model"));
const express_validator_1 = require("express-validator");
const search_user = (req, res) => {
    const contactName = req.query.contactName;
    const user_id = req.session.userData.userId;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        user_model_1.default.aggregate([
            //find searched user with username 
            { $match: { name: new RegExp('^' + contactName + '$', "i") } },
            // find user data if searched user is friend with user then set key to isFriend true else set is Friend false
            {
                $lookup: {
                    from: "userModel",
                    let: { userId: '$_id', friends: "$friends", friendRequests: "$friendRequests", conversations: "$conversations" },
                    pipeline: [
                        { $match: { "_id": user_id } },
                        {
                            $project: {
                                _id: 1,
                                friends: 1,
                                friendRequests: 1,
                                conversations: 1
                            }
                        }
                    ],
                    as: "userData"
                }
            },
            {
                $addFields: {
                    isFriend: {
                        $in: ['$_id', "$userData.friends"]
                    }
                }
            },
            {
                $addFields: {
                    conversation: {
                        $filter: {
                            input: "$userData.conversations",
                            as: "convs",
                            cond: { $in: ["$$convs.contact_Id", user_id] }
                        }
                    }
                }
            },
            { $addFields: {
                    friendRequest: {
                        $filter: {
                            input: "$userData.friendRequests",
                            as: "reqs",
                            cond: { $in: ["$$reqs", user_id] }
                        }
                    }
                } },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    profileImagePath: 1,
                    isFriend: 1,
                    conversation: 1,
                    friendRequest: 1
                }
            },
        ]).exec((err, val) => {
            console.log(err);
            res.status(200).json({
                message: "user found",
                body: val
            });
        });
    }
    else {
        res.status(500).json({ message: "there is an error", errors });
    }
};
exports.default = search_user;
//# sourceMappingURL=search_user.js.map