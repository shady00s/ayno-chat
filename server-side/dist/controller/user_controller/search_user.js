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
        // user_model.findOne({name:new RegExp('^'+contactName+'$', "i")}).select(["-password",'-messages','-groups']).then(async(searchResult)=>{
        //     // check if the user found
        //     if(searchResult !== null){
        //        let userFriends = await user_model.findById(user_id).select(["-password",'-messages','-groups']).then(friendsData=>friendsData)
        //         for (let index = 0; index < userFriends.friends.length; index++) {
        //             if(userFriends.friends[index].equals(searchResult.id)){
        //                 isFriend = true
        //             }
        //         }
        //         if(isFriend === true){
        //             for (let index = 0; index < userFriends.conversations.length; index++) {
        //                 if(userFriends.conversations[index].contact_Id.equals(searchResult.id)){
        //                     conversation_id = userFriends.conversations[index].conversation_Id
        //                 }
        //             }
        //             res.status(200).json({
        //                 message:"user found",
        //                 body: {
        //                     id:searchResult.id,
        //                     name:searchResult.name,
        //                     profileImagePath:searchResult.profileImagePath,
        //                     isFriend,
        //                     conversation_id
        //                 }
        //             })
        //         }else{
        //             res.status(200).json({
        //                 message:"user found",
        //                 body: {
        //                     id:searchResult.id,
        //                     name:searchResult.name,
        //                     profileImagePath:searchResult.profileImagePath,
        //                     isFriend,
        //                 }
        //             })
        //     }
        //     }
        //     else{
        //         res.status(204).json({
        //             message:"user not found"
        //         })
        //     }
        // })  
        user_model_1.default.aggregate([
            //find searched user with username 
            { $match: { name: new RegExp('^' + contactName + '$', "i") } },
            // find user data if searched user is friend with user then set key to isFriend true else set is Friend false
            { $lookup: {
                    from: "userModel",
                    let: { userId: '$_id', friends: "$friends" },
                    pipeline: [
                        { $match: { "_id": user_id } },
                        { $project: {
                                _id: 1,
                                friends: 1
                            } }
                    ],
                    as: "userData"
                } },
            { $addFields: { isFriend: {
                        $in: ['$_id', "$userData.friends"]
                    } } },
            // {$project:{
            //     _id:1,
            //     name:1,
            //     profileImagePath:1,
            //     isFriend:1,
            // }},
            // // if its true then set feild for conversation id
            // {$match:{ name:new RegExp('^'+contactName+'$', "i"), isFriend:true}},
            // {$addFields:{
            //     conversation_id:{$filter:{
            //         input:"$userData.conversations",
            //         as:"convs",
            //         cond:
            //             {$in:[new mongoose.Types.ObjectId(user_id),"$$convs.contact_Id"]}
            //     }}
            // }},
            { $project: {
                    _id: 1,
                    name: 1,
                    profileImagePath: 1,
                    isFriend: 1,
                    conversation_id: 1
                } }
        ]).exec((err, val) => {
            console.log(err);
            res.status(200).json({
                message: "user found",
                body: val
            });
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