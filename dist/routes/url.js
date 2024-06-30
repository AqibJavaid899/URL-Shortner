"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_1 = require("../controllers/url");
const router = express_1.default.Router();
router.post("/", url_1.handleGenerateNewShortUrl);
router.get("/:shortId", url_1.handleRedirectToOriginalUrl);
router.get("/analytics/:shortId", url_1.handleGetUrlAnalytics);
exports.default = router;
