import { Request, Response, NextFunction } from 'express';

export function sessionMiddleware(req: Request, res: Response, next: NextFunction) {

    if (req.session.userData) {
        next()
    }
    else {
        res.status(500).json({ message: "there is an error with session", seesionVal: req.session.userData })
    }

}

export function logInFromSession(req: Request, res: Response, next: NextFunction) {
  
        const session = req.session.userData
        console.log(req.cookies['ayno.sid']);
        if (req.session.userData) {
            res.status(200).json({
                message: "succssess", data: {
                    id: session.userId,
                    name: session.userName,
                    profilePath: session.userProfilePath
                }
            })
        }
        else {
            res.status(500).json({ message: "error with the session"})

        }



}


export function checkSessionAuthenticationController(req: Request, res: Response,) {
    if (req.session.userData) {
        res.status(200).json({ message: "authenticated", body: { profileImagePath: req.session.userData.userProfilePath, name: req.session.userData.userName, id: req.session.userData.userId } })


    } else {
        res.status(200).json({ message: "not authenticated" })
    }
}