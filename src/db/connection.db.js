import mongoose from "mongoose";

export const connectdb = async () => {
  // You can replace this with your MongoDB Atlas connection string
  // For local development, make sure MongoDB is running on your machine
  const mongoURI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bams_app";

  // Connection options to handle timeouts and reconnection
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Reduce timeout to 5 seconds
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    bufferCommands: true, // Change to true to allow buffering until connection is ready
    bufferMaxEntries: 0,
  };

  return mongoose
    .connect(mongoURI, options)
    .then(() => {
      console.log("connection to db successful");
    })
    .catch((err) => {
      console.log("connection to db failed", err);
    });
};
