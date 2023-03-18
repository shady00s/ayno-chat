"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileValidator = void 0;
const express_validator_1 = require("express-validator");
exports.editProfileValidator = [
    (0, express_validator_1.body)('newUserName').isString(),
    (0, express_validator_1.body)('newUserPassword').isString(),
    (0, express_validator_1.body)('newProfileImagePath').isString(),
];
//# sourceMappingURL=editProfileValidators.js.map