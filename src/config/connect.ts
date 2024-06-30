import mongoose from "mongoose";

export const connectToMongoDB = async (dbUrl: string) => {
  mongoose.set("strictQuery", true);

  await mongoose.connect(dbUrl);
};
