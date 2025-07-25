import express from "express";
import {
    viewAllUsers,
    showBalanceInquery,
    createUser,
    deposite,
    withdraw,
    deleteUser,
    transfer
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/api/accounts", viewAllUsers);

router.get("/api/accounts/balance-inquery/:accountId", showBalanceInquery);

router.post("/api/accounts/create", createUser);

router.patch("/api/accounts/deposit/:accountId", deposite);

router.patch("/api/accounts/withdraw/:accountId", withdraw);

router.delete("/api/accounts/delete/:accountId", deleteUser);

router.patch("/api/accounts/transfer", transfer);


export default router;
