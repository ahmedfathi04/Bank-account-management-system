import mongoose from "mongoose";

export const connectdb = () => {
  return mongoose
    .connect("mongodb://127.0.0.1:27017/bams_app")
    .then(() => {
      console.log("connection to db successful");
    })
    .catch((err) => {
      console.log("connection to db failed", err);
    });
};
