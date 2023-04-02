"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
function logOutController(req, res) {
    const user_session_id = req.sessionID;
    server_1.store.destroy(user_session_id, (error) => {
        if (error) {
            res.status(400).json({ message: "there is an error with session", error });
        }
    });
    req.session.destroy((error) => {
        if (error) {
            res.status(400).json({ message: "there is an error with session", error });
        }
    });
    res.status(201).json({ message: "logout-successfully" });
    // res.redirect('/user/loginAuth')
}
exports.default = logOutController;
//# sourceMappingURL=log-out.js.map