import mongoose from "mongoose";
import { groupModel, voteModel } from "../types/message_types";


const groups_model = new mongoose.Schema<groupModel>({
    conversation_id: { type: mongoose.Schema.Types.ObjectId },
    conversation_name: { type: String, required: true },
    media: [{ type: String, default: [] }],
    members_ids: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "UsersModel" }],
    messages: [{
        votingData: {
            voteId:{type:mongoose.Schema.Types.ObjectId},
            voteQuestion: {type:String},
             voteChoices: [{ voteId:{type:String}, voteData:{type:String}}],
            voteParticepents: [{ particepentChoice: {type:String}, prticipentId: {type:mongoose.Types.ObjectId },default:[]}]
        },
        message: { type: String, required: true },
        sender_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "UsersModel" },
        sender_image_path: { type: String, required: true },
        seen: { type: Boolean, default: false },
        delivered: { type: Boolean, default: false },
        date: { type: Date, default: Date.now() },
        sender_color: { type: String },
        sender_name: { type: String },
        type: { type: String, enum: ['message', 'vote'], default: 'message' }
    }],
    message_colors:[{id:{type:mongoose.Schema.Types.ObjectId,ref:"UsersModel"},color:{type:String}}]
})

export default mongoose.model('groups_collection', groups_model)