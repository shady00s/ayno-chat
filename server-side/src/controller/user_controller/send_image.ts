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

                })
            }
        }
        return mediaLinks
    }

    try {
        sendDataToCloudinary().then(async (value) => {

            if (value.length > 1) {

                if (conversation_type === 'contact') {
                    const mediaMessage = []
                    for (let index = 0; index < value.length; index++) {
                        mediaMessage.push({ sender_id: sender_id, message: value[index], sender_image_path: sender_image_path, })
                        socketManager.imageSocket(conversation_id, { sender_id: sender_id, message: value[index], sender_image_path: sender_image_path, })

                    }
                    await conversation_model.findOneAndUpdate({ conversation_id: conversation_id }, { $push: { media: { $each: value }, messages: { $each: mediaMessage } } }, { new: true })
                } else {
                    const mediaMessage = []
                    for (let index = 0; index < value.length; index++) {
                        mediaMessage.push({ sender_id: sender_id, message: value[index], sender_image_path: sender_image_path, sender_name: req.session.userData.userName })
                        socketManager.imageSocket(conversation_id, { sender_id: sender_id, message: value[index], sender_image_path: sender_image_path, sender_name: req.session.userData.userName })

                    }

                    await groups_model.findOneAndUpdate({ conversation_id: conversation_id }, { $push: { media: { $each: value }, messages: { $each: mediaMessage } } }, { new: true })

                }


                res.status(201).json({ message: "images added successfully", images: value })
            }
            else if (value.length === 1) {
                if (conversation_type === 'contact') {

                    socketManager.imageSocket(conversation_id, { sender_id: sender_id, message: value[0], sender_image_path: sender_image_path, })

                    await conversation_model.findOneAndUpdate({ conversation_id: conversation_id }, { $push: { media: { $each: value }, messages: { sender_id: sender_id, message: value[0], sender_image_path: sender_image_path, } } }, { new: true })
                } else {

                    socketManager.imageSocket(conversation_id, { sender_id: sender_id, message: value[0], sender_image_path: sender_image_path, sender_name: req.session.userData.userName })

                    await groups_model.findOneAndUpdate({ conversation_id: conversation_id }, { $push: { media: { $each: value }, messages: { sender_id: sender_id, message: value[0], sender_image_path: sender_image_path, sender_name: req.session.userData.userName } } }, { new: true })

                }
                res.status(201).json({ message: "images added successfully", images: value })

            }
            else {
                res.status(500).json({ message: "There is an error , try again" })

            }
        })

    }

    catch (error) {
        res.status(500).json({ message: "There is an error , try again", error })

    }





}


