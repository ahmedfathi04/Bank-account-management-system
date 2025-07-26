import accountmodel from "../models/account.model.js";
import { validationResult } from 'express-validator';

const showBalanceInquery = async (req, res) => {
	try {
    	const userId = req.userId; // Added in verifyToken middleware
  		const account = await accountmodel.findOne({userId: userId}, {"__v": false});
  		res.status(200).json({status: 'success', data: account})
  	} catch(err) {
		res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  	}
};

const deposite = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 'error', errors: errors.array() });
		}

		const userId = req.userId; // Added in verifyToken middleware
		const depositAmount = req.body.balance;

		const account = await accountmodel.findOneAndUpdate( 
		{ userId: userId },
		{ $inc: { balance: depositAmount } },
		{ new: true }
		);

		res.status(200).json({
		message: "Balance updated successfully",
		YourBalance: account.balance,
		});
	} catch(err) {
		res.status(500).json({ status: 'error', message: 'Internal Server Error' });
	}
};

const withdraw = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 'error', errors: errors.array() });
		}

		const userId = req.userId; // Added in verifyToken middleware
		const withdrawAmount = req.body.balance;

		const account = await accountmodel.findOne({userId: userId});
		account.balance -= withdrawAmount;
		await account.save();

		res.status(200).json({
		message: "Balance updated successfully",
		YourBalance: account.balance,
		});
	} catch(err) {
		res.status(500).json({ status: 'error', message: 'Internal Server Error' });
	}
	
};

const transfer = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 'error', errors: errors.array() });
		}
		
		const SenderId = req.userId; // Added in verifyToken middleware
		const ReceiverId = req.body.ReceiverId;
		const transferAmount = req.body.transfer;

		const senderAccount = await accountmodel.findOne({userId: SenderId});
		// Chack if there is enough balance
		if (senderAccount.balance < transferAmount) {
		return res.status(400).json({ status: 'error', message: 'Insufficient balance' });
		}
		senderAccount.balance -= transferAmount;
		await senderAccount.save();

		const receiverAccount = await accountmodel.findOneAndUpdate(
		{userId: ReceiverId},
		{ $inc: { balance: transferAmount } },
		{ new: true }
		);

		// Stop if receiverId is invalid
		if (!receiverAccount)
			res.status(404).json({ status: 'error', message: 'Reciver account not found'});

		await receiverAccount.save();

		res.status(200).json({
		message: "Money transfered successfully",
		YourBalance: senderAccount.balance,
		});
	} catch(err) {
		res.status(500).json({ status: 'error', message: 'Internal Server Error', er: err });
	}
};

export {
  showBalanceInquery,
  deposite,
  withdraw,
  transfer
};