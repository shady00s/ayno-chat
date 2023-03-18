"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../model/user_model"));
const password_manager_1 = __importDefault(require("../../utils/managers/password_manager"));
const express_validator_1 = require("express-validator");
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