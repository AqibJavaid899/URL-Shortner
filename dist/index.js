"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_1 = __importDefault(require("./routes/url"));
const connect_1 = require("./config/connect");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8001;
(0, connect_1.connectToMongoDB)("mongodb://localhost:27017/url-shortner")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
app.use(express_1.default.json());
app.use("/url", url_1.default);
app.listen(PORT, () => console.log(`Server running at PORT:${PORT}`));
