"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordManager {
}
_a = PasswordManager;
PasswordManager.encode = async (password) => {
    let hashedPass = await bcrypt_1.default.hash(password, 10);
    return hashedPass;
};
PasswordManager.decode = async (password, passwordFromDatabase) => {
    let decodedPass = await bcrypt_1.default.compare(password, passwordFromDatabase).then(val => val);
    return decodedPass;
};
exports.default = PasswordManager;
//# sourceMappingURL=password_manager.js.map