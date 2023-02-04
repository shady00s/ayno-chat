import { Request,Response,NextFunction } from 'express';

export function sessionMiddleware(req:Request,res:Response,next:NextFunction){
   if(req.session.userData !==null || req.session.userData !== undefined    ){
    next()
   }
   else{
    res.status(500).json({message:"there is an error with session"})
   }

}

export function logInFromSession(req:Request,res:Response,next:NextFunction){
    const session = req.session.userData

    if(req.session.userData !== undefined){
        res.status(200).json({message:"succssess",data:{
            id:session.userId,
            name:session.userName,
            profilePath:session.userProfilePath
        }})
    }
    res.status(500).json({message:"error with session"})
}