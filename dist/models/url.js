"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const urlSchema = new mongoose_1.default.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        require: true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Number,
            },
            userIP: {
                type: String,
            },
        },
    ],
}, { timestamps: true });
const URL = mongoose_1.default.model("url", urlSchema);
exports.default = URL;
