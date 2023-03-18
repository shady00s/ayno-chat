"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userTokenGenerator = (userData) => {
    const userToken = jsonwebtoken_1.default.sign(userData, process.env.USER_SECRET_TOKEN, { algorithm: "HS512" });
    return userToken;
};
exports.default = userTokenGenerator;
//# sourceMappingURL=user_token.js.map