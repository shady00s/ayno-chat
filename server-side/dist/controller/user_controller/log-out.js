"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
function logOutController(req, res) {
    const user_session_id = req.sessionID;
    server_1.store.destroy(user_session_id, (error) => {
        if (error) {
            res.status(400).json({ message: "there is an error with session", error });
        }
        else {
            server_1.store.destroy(user_session_id, (err) => {
                if (err) {
                    res.status(501).json({ message: "There is an error", err });
                }
                else {
                    res.status(201).json({ message: "logout-successfully" });
                }
            });
        }
    });
}
exports.default = logOutController;
//# sourceMappingURL=log-out.js.map