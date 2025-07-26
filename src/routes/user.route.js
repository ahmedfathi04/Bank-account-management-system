import express from "express";
import {registerUserValidationSchema, loginValidationSchema} from "../middlewares/validationschema.js";
import {verifyToken} from "../middlewares/verifytoken.js";
import {allowedTo} from "../middlewares/allowedto.js";
import {
    viewAllUsers,
    createUser,
    login,
    deleteUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/api/users", verifyToken, allowedTo('admin'), viewAllUsers);

router.post("/api/users/create", registerUserValidationSchema, createUser);

router.post("/api/users/login", loginValidationSchema, login);

router.delete("/api/users/delete/:accountId", verifyToken, allowedTo('admin'), deleteUser);


export default router;
