import express from "express";
import { connectdb } from "./src/db/connection.db.js";
import userRoute from "./src/routes/user.route.js";

const app = express();
const port = 3000;

connectdb();

app.use(express.json());

app.use("/", userRoute);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
