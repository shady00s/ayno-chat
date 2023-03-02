import { Request, Response } from "express";
import conversation_model from "../../model/conversation_model";

const getMediaContoller = (req:Request,res:Response)=>{
    const conversation_id = req.query.conversation_id
    if(conversation_id !== ""){

        try{
            conversation_model.findOne({conversation_id}).then(conv=>{
                if(conv !== null){
                    res.status(200).json({message:"succssess",body:conv.media})
     
                }
                else{
                    res.status(500).json({message:"There is no conversation with this id"})
    
                }
            })
            
        }catch(e){
            res.status(500).json({message:"Error",body:e})
 
        }
        
    }
    else{
        res.status(500).json({message:"conversation id is empty"})

    }
}
export default getMediaContoller