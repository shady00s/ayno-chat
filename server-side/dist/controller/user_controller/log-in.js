"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../model/user_model"));
const password_manager_1 = __importDefault(require("../../utils/managers/password_manager"));
const express_validator_1 = require("express-validator");
const server_1 = require("./../../server");
const userLogin = (req, res, next) => {
    const user_name = req.body.user_name;
    const user_password = req.body.user_password;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            user_model_1.default.findOne({ name: user_name }).then(async (userVal) => {
                if (userVal !== null) {
                    let isValidated = await password_manager_1.default.decode(user_password, userVal.password.toString());
                    if (isValidated) {
                        // check if the user had a previous session if not then save it and if found then touch it to re-initilize the datetime of the session
                        try {
                            server_1.client.db().collection('sessions').findOne({ "session.userData.userName": user_name }).then(returnedVal => {
                                if (returnedVal === null) {
                                    req.session.userData = {
                                        userId: userVal.id,
                                        userName: userVal.name,
                                        userProfilePath: userVal.profileImagePath
                                    };
                                    req.session.save(function (err) {
                                        if (err) {
                                            res.status(400).json({ message: "session err", err: err });
                                        }
                                        else {
                                            res.redirect('/user/loginAuth');
                                        }
                                    });
                                }
                                else {
                                    server_1.store.get(returnedVal._id.toString(), function (err, sessionData) {
                                        if (err) {
                                            res.status(400).json({ message: "session err", err: err });
                                        }
                                        else {
                                            sessionData.cookie.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
                                            server_1.store.touch(req.session.id, sessionData);
                                        }
                                    });
                                }
                            });
                        }
                        catch (error) {
                            res.status(500).json({ message: "error while getting session", err: error });
                        }
                    }
                    else {
                        res.status(500).json({ message: `wrong email or password` });
                    }
                }
                else {
                    res.status(500).json({ message: `no user with name ${user_name}` });
                }
            });
        }
        catch (error) {
            res.status(500).json({ message: `error occured ${user_name}` });
        }
    }
    else {
        res.status(500).json({ message: `user name or password are undefined` });
    }
    // check if the user 
};
exports.default = userLogin;
//# sourceMappingURL=log-in.js.map