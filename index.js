import express from "express";
import { connectdb } from "./src/db/connection.db.js";
import usermodel from "./src/db/models/user.model.js";

const app = express();
const port = 3000;

connectdb();

app.use(express.json());

app.get("/api/accounts", async (req, res) => {
  const accounts = await usermodel.find();
  res.json(accounts);
});

app.get("/api/accounts/balance-inquery/:accountId", async (req, res) => {
  const accountId = req.params.accountId;
  const account = await usermodel.findById(accountId);
  res.json(account);
});

app.post("/api/accounts/create", async (req, res) => {
  const newAccount = new usermodel(req.body);
  const savedAccount = await newAccount.save();
  res.status(201).json(savedAccount);
});

app.patch("/api/accounts/deposit/:accountId", async (req, res) => {
  const accountId = req.params.accountId;
  const depositAmount = req.body.balance;

  const account = await usermodel.findByIdAndUpdate(
    accountId,
    { $inc: { balance: depositAmount } },
    { new: true }
  );

  res.json({
    message: "Balance updated successfully",
    YourBalance: account.balance,
  });
});

app.patch("/api/accounts/withdraw/:accountId", async (req, res) => {
  const accountId = req.params.accountId;
  const withdrawAmount = req.body.balance;

  const account = await usermodel.findById(accountId);
  account.balance -= withdrawAmount;
  await account.save();

  res.json({
    message: "balance updated successfully",
    YourBalance: account.balance,
  });
});

app.delete("/api/accounts/delete/:accountId", async (req, res) => {
  const accountId = req.params.accountId;
  await usermodel.findByIdAndDelete(accountId);
  res.status(200).end("deleted successfully");
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
