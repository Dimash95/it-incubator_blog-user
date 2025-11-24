import { body } from "express-validator";

export const userValidation = [
  body("login")
    .trim()
    .isString()
    .withMessage("login must be a string")
    .notEmpty()
    .withMessage("login is required"),

  body("password")
    .trim()
    .isString()
    .withMessage("password must be a string")
    .notEmpty()
    .withMessage("password is required"),

  body("email")
    .trim()
    .isString()
    .withMessage("email must be a string")
    .notEmpty()
    .withMessage("email is required")
    .isEmail(),
];
