import express from "express";

import {
  handleGenerateNewShortUrl,
  handleGetUrlAnalytics,
  handleRedirectToOriginalUrl,
} from "../controllers/url";

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleRedirectToOriginalUrl);
router.get("/analytics/:shortId", handleGetUrlAnalytics);

export default router;
