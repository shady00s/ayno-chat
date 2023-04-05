"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.client = void 0;
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const user_routes_1 = __importDefault(require("./routes/user_routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const chat_routes_1 = __importDefault(require("./routes/chat_routes"));
const socket_manager_1 = require("./sockets/socket_manager");
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const express_session_1 = __importDefault(require("express-session"));
require("express-session");
const http_1 = require("http");
const mongodb_1 = require("mongodb");
exports.client = new mongodb_1.MongoClient(`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@chatdatabase.fnneyaw.mongodb.net/
`);
dotenv.config();
const app = (0, express_1.default)();
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
//expires after one week
let expiredDate = 1000 * 60 * 60 * 24 * 7;
exports.store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@chatdatabase.fnneyaw.mongodb.net/`,
    collection: "sessions",
    expires: expiredDate,
});
app.set("trust proxy", 1);
app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.Client_URL);
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization , Origin , X-Requested-With,Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
require('dotenv').config();
// api rules
app.use((0, express_session_1.default)({
    name: "ayno.sid",
    store: exports.store,
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: expiredDate,
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    },
}));
app.use('/user', user_routes_1.default);
app.use('/chat', chat_routes_1.default);
app.use('*', (req, res) => {
    res.json({ message: "bad route" });
});
try {
    const server = (0, http_1.createServer)(app);
    socket_manager_1.socketManager.connectSocket(server);
    socket_manager_1.socketManager.messageSocket();
    socket_manager_1.socketManager.groupMessageSocket();
    socket_manager_1.socketManager.notificationSocket();
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connect(`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@chatdatabase.fnneyaw.mongodb.net/
    `, { retryWrites: true, w: 'majority',
    }).then((val) => {
        logger_1.default.info('connected to mongo database ');
        server.listen(8080, () => {
            logger_1.default.info("connected to port 8080");
        });
    });
}
catch (error) {
    logger_1.default.error('faild to connect to mongo database' + error);
}
//# sourceMappingURL=server.js.map