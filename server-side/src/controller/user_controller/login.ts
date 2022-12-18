import { Request,Response } from "express"
const userLoginController = (req:Request,res:Response)=>{
    const userName = req.body.userName
    const password = req.body.password
}

export default userLoginController