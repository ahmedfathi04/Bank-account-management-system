import express from "express";
import {accountValidationSchema, accountTransferValidationSchema} from "../middlewares/validationschema.js"
import {verifyToken} from "../middlewares/verifytoken.js";
import {allowedTo} from "../middlewares/allowedto.js";
import {
    showBalanceInquery,
    deposite,
    withdraw,
    transfer
} from "../controller/account.controller.js";

const router = express.Router();

router.use(verifyToken, allowedTo('user'));

router.get("/api/accounts/balance-inquery", showBalanceInquery);

router.patch("/api/accounts/deposit", accountValidationSchema, deposite);

router.patch("/api/accounts/withdraw", accountValidationSchema, withdraw);

router.patch("/api/accounts/transfer", accountTransferValidationSchema, transfer);

export default router;
