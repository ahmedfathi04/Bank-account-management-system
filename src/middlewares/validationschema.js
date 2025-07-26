import {body} from "express-validator"
import { validationResult } from 'express-validator';

const registerUserValidationSchema = [
    body('name').notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

    body('email').notEmpty().withMessage('Email is required')
    .isLength({ min: 10 }).withMessage('Email must be at least 10 characters long'),

    body('phone').notEmpty().withMessage('Phone number is required')
    .isLength({ min: 11 }).withMessage('Phone number must be 11 digits long'),

    body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 digits long')
]

const loginValidationSchema = [
    body('email').notEmpty().withMessage('Email is required')
    .isLength({ min: 10 }).withMessage('Email must be at least 10 characters long'),

    body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 digits long')
]

const accountValidationSchema = [
    body('balance').exists().withMessage('Balance is required')
    .isFloat({ gt: 0 }).withMessage("Balance must be greater than 0")
    .toFloat()
]

const accountTransferValidationSchema = [
    body('transfer').exists().withMessage('Balance is required')
    .isFloat({ gt: 0 }).withMessage("Balance must be greater than 0")
    .toFloat(),

    body('ReceiverId').notEmpty().withMessage('ReceiverId is required')
]

export {
    registerUserValidationSchema,
    loginValidationSchema,
    accountValidationSchema,
    accountTransferValidationSchema
}