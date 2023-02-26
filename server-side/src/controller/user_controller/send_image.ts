import { NextFunction, Request, Response } from "express";
import ImageManager from '../../utils/managers/image_manager';
import conversation_model from "../../model/conversation_model";
import groups_model from "../../model/groups_model";
import { socketManager } from "../../sockets/socket_manager";

export default async function sendImage(req: Request, res: Response, next: NextFunction) {
    const user_name = req.session.userData.userName
    const media: string[] = req.body.media
    const conversation_id: string = req.body.conversation_id
    const sender_id = req.session.userData.userId
    const sender_image_path: string = req.body.sender_image_path
    const conversation_type = req.body.type
    // check if the body is not null
    async function sendDataToCloudinary(): Promise<string[]> {
        const mediaLinks: string[] = []

        for (let index = 0; index < media.length; index++) {
            if (media[index].match(/^data:([A-Za-z-+/]+);base64,(.+)$/)) {
                await ImageManager.uploadImage(media[index], conversation_id).then((data) => {
                    mediaLinks.push(data.url)
                    //    new SocketManager().imageUrl ={message:data.url,sender_id:sender_id,sender_image_path:sender_image_path} 
                
                })
            }
        }
        return mediaLinks
    }

    try {

        sendDataToCloudinary().then(async (value) => {
            if (value.length !== 0) {

                if(conversation_type === 'contact'){
                    for (let index = 0; index < value.length; index++) {
                        await conversation_model.findOneAndUpdate({ conversation_id: conversation_id }, { $push: { media: value[index], messages: { sender_id: sender_id, sender_image_path: sender_image_path, message: value[index] } } },).then(val=>val)
    

                    }
                }else{
                    for (let index = 0; index < value.length; index++) {
                        await groups_model.findOneAndUpdate({ conversation_id: conversation_id }, { $push: { media: value[index], messages: { sender_id: sender_id, sender_image_path: sender_image_path, message: value[index] ,sender_name:user_name} } },).then(val=>val)
    
    
                    }
                }
                

                res.status(200).json({ message: "images added successfully", images: value })
            }
            else {
                res.status(500).json({ message: "There is an error , try again" })

            }
        })

    }

    catch (error) {
        console.log(error);
    }





}


