// auth.validation.ts

import { body } from 'express-validator';

export const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
];

export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

 
