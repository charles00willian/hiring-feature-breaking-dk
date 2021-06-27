import mongoose from "mongoose";

export const dbConnect = async () =>
  mongoose.connect(process.env.MONGODB_URI || "localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
