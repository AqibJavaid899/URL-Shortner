import { Request, Response } from "express";
import { nanoid } from "nanoid";

import URL from "../models/url";
import { IURL } from "../types/url";

export const handleGenerateNewShortUrl = async (
  req: Request,
  res: Response
) => {
  try {
    const body = req.body;
    if (!body.url) res.status(400).json({ error: "URL parameter is missing." });

    let id = nanoid(8);
    await URL.create({
      shortId: id,
      redirectUrl: body.url,
      visitHistory: [],
    });
    res.status(201).json({ shortId: id });
  } catch (error) {
    console.error("Error is : ", error);
    res.json({ error });
  }
};

export const handleRedirectToOriginalUrl = async (
  req: Request,
  res: Response
) => {
  try {
    const shortId = req.params.shortId;

    if (!shortId)
      res.status(400).json({ error: "ShortId parameter is missing." });

    const result: IURL | null = await URL.findOneAndUpdate(
      {
        shortId: shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
            userIP: req.ip,
          },
        },
      }
    );
    res.redirect(result?.redirectUrl || "");
  } catch (error) {
    console.error("Error is : ", error);
    res.json({ error });
  }
};

export const handleGetUrlAnalytics = async (req: Request, res: Response) => {
  try {
    const shortId = req.params.shortId;

    if (!shortId)
      res.status(400).json({ error: "ShortId parameter is missing." });

    const result: IURL | null = await URL.findOne({
      shortId,
    });

    res.status(200).json({
      totalClicks: result?.visitHistory.length,
      urlAnalytics: result?.visitHistory,
    });
  } catch (error) {
    console.error("Error is : ", error);
    res.json({ error });
  }
};
