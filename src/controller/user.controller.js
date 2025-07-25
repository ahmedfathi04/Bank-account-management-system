import usermodel from "../db/models/user.model.js";

const viewAllUsers = async (req, res) => {
  const accounts = await usermodel.find();
  res.json(accounts);
};

const showBalanceInquery = async (req, res) => {
  const accountId = req.params.accountId;
  const account = await usermodel.findById(accountId);
  res.json(account);
};

const createUser = async (req, res) => {
  const newAccount = new usermodel(req.body);
  const savedAccount = await newAccount.save();
  res.status(201).json(savedAccount);
};

const deposite = async (req, res) => {
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
};

const withdraw = async (req, res) => {
  const accountId = req.params.accountId;
  const withdrawAmount = req.body.balance;

  const account = await usermodel.findById(accountId);
  account.balance -= withdrawAmount;
  await account.save();

  res.json({
    message: "Balance updated successfully",
    YourBalance: account.balance,
  });
};

const deleteUser = async (req, res) => {
  const accountId = req.params.accountId;
  await usermodel.findByIdAndDelete(accountId);
  res.status(200).end("deleted successfully");
};

export {
  viewAllUsers,
  showBalanceInquery,
  createUser,
  deposite,
  withdraw,
  deleteUser,
};
