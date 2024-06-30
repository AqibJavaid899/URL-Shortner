"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetUrlAnalytics = exports.handleRedirectToOriginalUrl = exports.handleGenerateNewShortUrl = void 0;
const nanoid_1 = require("nanoid");
const url_1 = __importDefault(require("../models/url"));
const handleGenerateNewShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.url)
            res.status(400).json({ error: "URL parameter is missing." });
        let id = (0, nanoid_1.nanoid)(8);
        yield url_1.default.create({
            shortId: id,
            redirectUrl: body.url,
            visitHistory: [],
        });
        res.status(201).json({ shortId: id });
    }
    catch (error) {
        console.error("Error is : ", error);
        res.json({ error });
    }
});
exports.handleGenerateNewShortUrl = handleGenerateNewShortUrl;
const handleRedirectToOriginalUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortId = req.params.shortId;
        if (!shortId)
            res.status(400).json({ error: "ShortId parameter is missing." });
        const result = yield url_1.default.findOneAndUpdate({
            shortId: shortId,
        }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                    userIP: req.ip,
                },
            },
        });
        res.redirect((result === null || result === void 0 ? void 0 : result.redirectUrl) || "");
    }
    catch (error) {
        console.error("Error is : ", error);
        res.json({ error });
    }
});
exports.handleRedirectToOriginalUrl = handleRedirectToOriginalUrl;
const handleGetUrlAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortId = req.params.shortId;
        if (!shortId)
            res.status(400).json({ error: "ShortId parameter is missing." });
        const result = yield url_1.default.findOne({
            shortId,
        });
        res.status(200).json({
            totalClicks: result === null || result === void 0 ? void 0 : result.visitHistory.length,
            urlAnalytics: result === null || result === void 0 ? void 0 : result.visitHistory,
        });
    }
    catch (error) {
        console.error("Error is : ", error);
        res.json({ error });
    }
});
exports.handleGetUrlAnalytics = handleGetUrlAnalytics;
