"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../model/user_model"));
const password_manager_1 = __importDefault(require("../../utils/managers/password_manager"));
const express_validator_1 = require("express-validator");
const server_1 = require("../../server");
async function editProfileController(req, res) {
    const user_data = req.session.userData;
    const newUserName = req.body.newUserName;
    const newUserPassword = req.body.newUserPassword;
    const newProfileImagePath = req.body.newProfileImagePath;
    let userEditedData = {};
    const reqErrors = (0, express_validator_1.validationResult)(req);
    try {
        if (!reqErrors.isEmpty()) {
            res.status(400).json({ message: "errors found", errors: reqErrors });
        }
        else {
            const password = await password_manager_1.default.encode(newUserPassword.toString()).then(val => val);
            if (newUserName !== "") {
                userEditedData.name = newUserName;
            }
            if (newUserPassword !== "") {
                userEditedData.password = password;
            }
            if (newProfileImagePath !== "") {
                userEditedData.profileImagePath = newProfileImagePath;
            }
            //save the new data into store
            server_1.store.get(req.sessionID, (err, session) => {
                if (err) {
                    res.status(501).json({ message: "there is an error while getting session", err });
                }
                else {
                    if (newUserName !== "") {
                        session.userData.userName = newUserName;
                    }
                    if (newProfileImagePath !== "") {
                        session.userData.userProfilePath = newProfileImagePath;
                    }
                }
                server_1.store.set(req.sessionID, session, (err) => {
                    if (err) {
                        res.status(501).json({ message: "there is an error while setting session", err });
                    }
                });
            });
            user_model_1.default.findByIdAndUpdate({ _id: user_data.userId }, userEditedData, { new: true }).then(newpersonVal => {
                if (newpersonVal !== null) {
                    res.status(201).json({ message: "succssess", newpersonVal });
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "there is an error" });
    }
}
exports.default = editProfileController;
//# sourceMappingURL=edit_profile.js.map