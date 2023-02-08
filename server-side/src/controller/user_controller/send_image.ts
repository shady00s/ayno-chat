import { NextFunction, Request, Response } from "express";
import ImageManager from './utils/image_manager';
import conversation_model from "../../model/conversation_model";
import SocketManager from '../../sockets/socket_manager';
import user_model from "../../model/user_model";

export default async function sendImage(req: Request, res: Response, next: NextFunction) {

    const media: string[] = req.body.media
    const conversation_id: string = req.body.conversation_id
    const sender_id:string = req.session.userData.userId.id.toString()
    const sender_image_path:string = req.body.sender_image_path

    // check if the body is not null
    async function sendDataToCloudinary(): Promise<string[]> {
        const mediaLinks: string[] = []

        for (let index = 0; index < media.length; index++) {
            if (media[index].match(/^data:([A-Za-z-+/]+);base64,(.+)$/)) {
                await ImageManager.uploadImage(media[index], conversation_id).then((data) => {
                    mediaLinks.push(data.url)
                    SocketManager.imageSocket({message:data.url,sender_id:sender_id,sender_image_path:sender_image_path})    
                })
            }
        }
        return mediaLinks
    }

    try {

        sendDataToCloudinary().then(async (value) => {
            if(value.length !==0){
                for (let index = 0; index < value.length; index++) {
                    await conversation_model.findOneAndUpdate({ conversation_id:conversation_id }, { $push: { media:  value[index] ,messages:{sender_id:sender_id, sender_image_path:sender_image_path, message:value[index]}} }, )
                   
                    
                }
            
            res.status(200).json({ message: "images added successfully",images:value })
            }
            else{
                res.status(500).json({ message: "There is an error , try again" })

            }
        })

    }

    catch (error) {
        console.log(error);
    }





}
   

