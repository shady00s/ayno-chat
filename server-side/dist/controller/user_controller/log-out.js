"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./../../app");
function logOutController(req, res) {
    const user_session_id = req.sessionID;
    app_1.store.destroy(user_session_id, (error) => {
        if (error) {
            res.status(400).json({ message: "there is an error with session", error });
        }
        else {
            app_1.store.destroy(user_session_id, (err) => {
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