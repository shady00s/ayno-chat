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
    const user_name = req.query.user_name;
    const user_password = req.query.user_password;
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            user_model_1.default.findOne({ name: user_name }).then(async (userVal) => {
                if (userVal !== null) {
                    let isValidated = await password_manager_1.default.decode(user_password.toString(), userVal.password.toString());
                    if (isValidated) {
                        // check if the user had a previous session if not then save it and if found then touch it to re-initilize the datetime of the session
                        try {
                            await server_1.client.db().collection('sessions').findOne({ "session.userData.userName": user_name }).then(async (returnedVal) => {
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
                                        res.redirect('/user/loginAuth');
                                    });
                                }
                                else {
                                    req.session.userData = returnedVal.session.userData;
                                    req.session.save(async function (err) {
                                        if (err) {
                                            res.status(400).json({ message: "session err", err: err });
                                        }
                                        else {
                                            await server_1.client.db().collection('sessions').findOneAndDelete({ _id: returnedVal._id }).then(val => {
                                                if (val !== null) {
                                                    res.redirect('/user/loginAuth');
                                                }
                                                else {
                                                    res.status(400).json({ message: "error occured" });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        catch (err) {
                            res.status(400).json({ message: `no user with name ${user_name}` });
                        }
                    }
                    else {
                        res.status(400).json({ message: "wrong name or password" });
                    }
                }
                else {
                    res.status(400).json({ message: `user  ${user_name} not found` });
                }
            });
        }
        catch (error) {
            res.status(400).json({ message: `error occured ${user_name}` });
        }
    }
    else {
        res.status(400).json({ message: `user name or password are undefined` });
    }
    // check if the user 
};
exports.default = userLogin;
//2023-03-29T14:14:15.802+00:00
//2023-03-29T14:36:58.546+00:00
//# sourceMappingURL=log-in.js.map