"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessionAuthenticationController = exports.logInFromSession = exports.sessionMiddleware = void 0;
function sessionMiddleware(req, res, next) {
    if (req.session.userData) {
        next();
    }
    else {
        res.status(500).json({ message: "there is an error with session", seesionVal: req.session.userData });
    }
}
exports.sessionMiddleware = sessionMiddleware;
function logInFromSession(req, res, next) {
    const session = req.session.userData;
    if (req.session.userData) {
        res.status(200).json({
            message: "succssess", data: {
                id: session.userId,
                name: session.userName,
                profilePath: session.userProfilePath
            }
        });
    }
    else {
        res.status(500).json({ message: "error with the session", session: session });
    }
}
exports.logInFromSession = logInFromSession;
function checkSessionAuthenticationController(req, res) {
    if (req.session.userData !== undefined) {
        res.status(200).json({ message: "authenticated", body: { profileImagePath: req.session.userData.userProfilePath, name: req.session.userData.userName, id: req.session.userData.userId } });
    }
    else {
        res.status(200).json({ message: "not authenticated" });
    }
}
exports.checkSessionAuthenticationController = checkSessionAuthenticationController;
//# sourceMappingURL=session.js.map