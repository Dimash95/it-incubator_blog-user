import { body } from "express-validator";

export const loginValidation = [
  body("loginOrEmail")
    .trim()
    .isString()
    .withMessage("loginOrEmail must be a string")
    .notEmpty()
    .withMessage("loginOrEmail is required"),

  body("password")
    .trim()
    .isString()
    .withMessage("password must be a string")
    .notEmpty()
    .withMessage("password is required"),
];
