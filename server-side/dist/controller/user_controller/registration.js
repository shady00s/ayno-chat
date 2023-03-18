"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../model/user_model"));
const logger_1 = __importDefault(require("../../utils/logger"));
const password_manager_1 = __importDefault(require("../../utils/managers/password_manager"));
const express_validator_1 = require("express-validator");
const userRegistrationController = (req, res, next) => {
    const userName = req.body.username;
    const password = req.body.password;
    const profileImagePath = req.body.profilePath;
    const errors = (0, express_validator_1.validationResult)(req);
    // check if there is any body key have undefined value
    if (!errors.isEmpty()) {
        res.status(204).json({ message: "data is missing or corupted", errors });
    }
    else {
        try {
            user_model_1.default.findOne({ name: userName }).then(valData => {
                if (valData !== null) {
                    res.status(200).json({ message: `there is already user with name ${userName}` });
                }
                else {
                    password_manager_1.default.encode(password).then((hashedPassword) => {
                        const UserModel = new user_model_1.default({
                            name: userName,
                            password: hashedPassword,
                            profileImagePath: profileImagePath
                        });
                        UserModel.save().then((val) => {
                            req.session.userData = {
                                userId: val.id,
                                userName: val.name,
                                userProfilePath: val.profileImagePath
                            };
                            req.session.save(function (err) {
                                if (err) {
                                    res.status(400).json({ message: "session err", err: err });
                                }
                                else {
                                    res.redirect('/user/loginAuth');
                                }
                            });
                            logger_1.default.info('Added to user database');
                            res.status(201).json({
                                message: "register-complete",
                                body: { name: val.name, profileImagePath: val.profileImagePath }
                            });
                        });
                    });
                }
            });
        }
        catch (error) {
            res.status(401).json({
                message: "register-failed",
                user_body: error
            });
        }
    }
};
exports.default = userRegistrationController;
//# sourceMappingURL=registration.js.map