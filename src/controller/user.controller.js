import usermodel from "../models/user.model.js";
import accountmodel from "../models/account.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from 'express-validator';

const viewAllUsers = async (req, res) => {
	try {
		const users = await usermodel.find({}, { "__v": false, "password": false });
		res.status(200).json({ status: 'success', data: users });
	} catch(err) {
		res.status(500).json({ status: 'error', message: 'Internal Server Error' });
	}
};


const createUser = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 'error', errors: errors.array() });
		}

	// -------Create user account-------
	const { name, email, phone, password, role } = req.body;

	// Check if user already exists
	const oldUser = await usermodel.findOne({ email: email });
	if (oldUser) return res.status(400).json({ status: 'error', message: 'User already exists' });

	// Encrypt password
	const hashedPassword = await bcrypt.hash(password, 10)

	const newUser = new usermodel({
				name,
				email,
				phone,
				password: hashedPassword,
				role
			})

	const savedUser = await newUser.save();

	// If the role is user then make an account

	//-------Create balance account-------
	if (newUser.role === 'user') {
		const newAccount = new accountmodel();
		newAccount.userId = newUser._id;
		// If the request has a balance put it in the account, else let it be 0
		if (req.body.balance) newAccount.balance = req.body.balance;
		
		await newAccount.save();
	}

	// Create token and return it with the response
	const token = await jwt.sign({id: newUser._id}, 'JWT_SECRET_KEY', { expiresIn: '3h' });

	res.status(201).json({ status: 'success', data: {token}, message: 'User account created successfully' });

	} catch(err) {
		res.status(500).json({ status: 'error', message: 'Internal Server Error', er: err });
	}
	
};

const login = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 'error', errors: errors.array() });
		}

		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ status: 'error', message: 'Email and password are required' });
		}

		// Find user in the database by email and match the given password with encrypted one
		const user = await usermodel.findOne({ email: email })
		const matchPassword = await bcrypt.compare(password, user.password)

		if (user && matchPassword) {
			// Create token
			const token = await jwt.sign({id: user._id}, 'JWT_SECRET_KEY', { expiresIn: '3h' });
			res.status(200).json({ status: 'success', data: {token}, message: 'Logged in successfully' });
		} else {
			res.status(400).json({ status: 'error', message: 'Invalid email or password' });
		}
	} catch (err) {
		res.status(500).json({ status: 'error', message: 'Internal Server Error' });
	}
}

const deleteUser = async (req, res) => {
	try {
		const accountId = req.params.accountId;
		await accountmodel.findOneAndDelete({ userId: accountId });
		await usermodel.findByIdAndDelete(accountId);
		res.status(200).json({ status: 'success', message: 'Deleted successfully' });
	} catch(err) {
		res.status(500).json({ status: 'error', message: 'Internal Server Error' });
	}
};


export {
  viewAllUsers,
  createUser,
  login,
  deleteUser,
};
