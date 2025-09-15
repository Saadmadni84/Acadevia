import { body } from 'express-validator';

export const userValidation = [
  body('userName')
    .exists({ checkFalsy: true })
    .withMessage('User name is required')
    .isString()
    .withMessage('User name should be a string'),

  body('password')
    .exists()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password should be a string')
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),

  body('gender')
    .optional()
    .isString()
    .withMessage('Gender should be a string')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender value is invalid'),

  body('dateOfBirth')
    .optional()
    .isDate()
    .withMessage('Date of birth should be a valid date'),

  body('phoneNumber')
    .optional()
    .isString()
    .withMessage('Phone number should be a string')
    .custom((value) => {
      if (value.length !== 10) {
        throw new Error('Phone number should be 10 digits');
      }
      return true;
    }),
];

 
