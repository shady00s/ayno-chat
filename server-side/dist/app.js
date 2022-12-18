"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// api rules
app.use((req, res, next) => {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Methods', '*');
    res.header('Access-Controll-Allow-Headers', 'Origin , X-Requested-With , Content-Type , Accept , Authorization');
});
app.use('/', (req, res) => {
    res.status(200).json({ message: "succssess" });
    res.send('data');
});
app.listen(8080, () => { logger_1.default.info("connected to port 8080"); });
//# sourceMappingURL=app.js.map