"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_model_1 = __importDefault(require("../../../model/groups_model"));
const express_validator_1 = require("express-validator");
function getGroupContacts(req, res) {
    const user_id = req.session.userData.userId;
    const group_id = req.query.groupId;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        // groups_model.findOne({conversation_id:group_id}).then(async group=>{
        // if(group !==null){
        //          const contacts:string[] = []
        //     for (let index = 0; index < group.members_ids.length; index++) {
        //         if(group.members_ids[index]._id.equals(user_id)) continue
        //         contacts.push(group.members_ids[index]._id.toString())
        //     }
        //     const userFriends = await user_model.findById(user_id).then(data=>data.friends)
        //    await user_model.find({_id:{$in:[...contacts]}},).select(['-conversations','-password','-friends','-friendRequests','-groups' ]).then(users=>{
        //         if(users!==null){
        //             for (let index = 0; index < userFriends.length; index++) {
        //                for (let index2 = 0; index2 < users.length; index2++) {
        //                }
        //             }
        //             res.status(200).json({message:"succssess",body:users})
        //         }
        //     })
        // }
        //})
        groups_model_1.default.aggregate([
            { $lookup: {
                    from: 'usermodels',
                    localField: "friends",
                    foreignField: "members_ids",
                    as: "groupContacts"
                } },
            { $project: {
                    "_id": 1,
                    "groupContacts": { $filter: {
                            input: "$groupContacts",
                            as: "groupContact",
                            cond: { $not: { $in: [user_id, "$$groupContact"] } }
                        } }
                } }
        ]).then(val => {
            res.status(200).json({ message: "succssess", body: val });
        });
    }
    else {
        res.status(500).json({ message: "there is an error", errors });
    }
}
exports.default = getGroupContacts;
//# sourceMappingURL=get_group_contacts.js.map