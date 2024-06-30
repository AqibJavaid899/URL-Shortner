import express from "express";

import router from "./routes/url";
import { connectToMongoDB } from "./config/connect";

const app = express();
const PORT = process.env.PORT || 8001;

connectToMongoDB("mongodb://localhost:27017/url-shortner")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use(express.json());

app.use("/url", router);

app.listen(PORT, () => console.log(`Server running at PORT:${PORT}`));
