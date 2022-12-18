"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logining {
}
exports.default = Logining;
Logining.info = (args) => console.log(chalk_1.default.blue(`[${new Date().toLocaleString()}] [INFO] `), typeof args === 'string' ? chalk_1.default.blueBright(args) : args);
Logining.warning = (args) => console.log(chalk_1.default.yellow(`[${new Date().toLocaleString()}] [INFO] `), typeof args === 'string' ? chalk_1.default.yellowBright(args) : args);
Logining.error = (args) => console.log(chalk_1.default.red(`[${new Date().toLocaleString()}] [INFO] `), typeof args === 'string' ? chalk_1.default.redBright(args) : args);
//# sourceMappingURL=logger.js.map