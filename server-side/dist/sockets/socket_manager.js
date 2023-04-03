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
exports.socketManager = void 0;
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("../utils/logger"));
const dotenv = __importStar(require("dotenv"));
// export default SocketManager
dotenv.config();
let io;
let users = [];
let oldConversation;
let socketManager = {
    connectSocket: (server) => {
        io = new socket_io_1.Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
        io.on('connection', (socket) => {
            logger_1.default.info('connection at socket ' + socket.id);
            socket.on("join-conversation", (conversation) => {
                oldConversation = conversation;
                socket.join(conversation);
            });
            // to join group conversation
            socket.on('join-group-conversation', (groupConversation) => {
                socket.leave(oldConversation);
                socket.join(groupConversation);
            });
            socket.on('disconnect', () => {
                logger_1.default.error('client disconnected with id ' + socket.id);
                users = users.filter(data => data.socket !== socket.id);
                io.emit('online-users', users);
            });
        });
        return io;
    },
    messageSocket: () => {
        if (!io) {
            logger_1.default.error('error at socket');
            return;
        }
        io.on('connection', (socket) => {
            socket.on("isTyping", ({ name, conversation_id, isTyping }) => {
                socket.to(conversation_id).emit("typing-data", name, isTyping);
            });
            socket.on("send-messages", (textVal, conversation_id) => {
                io.in(conversation_id).emit("recive-message", textVal);
                socket.to(conversation_id).emit("newMessage", { newMessage: 1, conversation_id });
            });
        });
    },
    notificationSocket: () => {
        if (!io) {
            logger_1.default.error('error at socket');
            return;
        }
        else {
            io.on('connection', (socket) => {
                socket.on('global-id', (id) => {
                    socket.join(id);
                });
                socket.on("new-notification", (id) => {
                    switch (id.type) {
                        case "message":
                            socket.to(id.id).emit('notification', { ...id });
                            break;
                        case "friend-request":
                            socket.to(id.reciverId).emit('notification', { ...id });
                            break;
                        case "group-message":
                            socket.to(id.id).emit('notification', { ...id });
                            break;
                        case "new-friend":
                            socket.to(id.id).emit('notification', { ...id });
                            break;
                        case "new-group":
                            for (let index = 0; index < id.data.members_ids.length; index++) {
                                socket.to(id.data.members_ids[index]).emit('notification', { ...id });
                            }
                            break;
                        default:
                            break;
                    }
                });
            });
        }
    },
    groupMessageSocket: () => {
        if (!io) {
            logger_1.default.error('error at socket');
            return;
        }
        io.on('connection', (socket) => {
            socket.on("isTyping", ({ name, conversation_id, isTyping }) => {
                socket.to(conversation_id).emit("typing-data", name, isTyping);
            });
            socket.on('join-group-conversation', (conversation) => {
                socket.join(conversation);
            });
            socket.on('send-group-message', (message, conversation_id) => {
                io.in(conversation_id).emit('recive-group-message', message);
            });
            socket.on('send-vote-participent', (participent, conversation_id) => {
                io.in(conversation_id).emit('recive-vote-participent', participent);
            });
        });
    },
    imageSocket: (conversation_ids, images) => {
        if (!io) {
            logger_1.default.error('error at socket');
            return;
        }
        io.in(conversation_ids).emit("images", images);
    }
};
exports.socketManager = socketManager;
//# sourceMappingURL=socket_manager.js.map