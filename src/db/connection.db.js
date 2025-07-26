import mongoose from "mongoose";

export const connectdb = async () => {
  // You can replace this with your MongoDB Atlas connection string
  // For local development, make sure MongoDB is running on your machine
  const mongoURI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bams_app";


  return mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("connection to db successful");
    })
    .catch((err) => {
      console.log("connection to db failed", err);
    });
};