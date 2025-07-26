import express from "express";

const app = express();
app.use(express.json());

import { connectdb } from "./src/db/connection.db.js";
connectdb();

import userRoute from "./src/routes/user.route.js";
app.use("/", userRoute);

import accountRoute from "./src/routes/account.route.js";
app.use("/", accountRoute);


const port = 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
