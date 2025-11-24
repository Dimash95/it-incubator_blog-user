import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { HttpResponses } from "../../const";
import { loginValidation } from "./validation";
import { inputValidation } from "../../middlewares/input-validation";
import { UserModel } from "../users/model";

export const authRouter = express.Router();

authRouter.post(
  "/",
  loginValidation,
  inputValidation,
  async (req: Request, res: Response) => {
    const { loginOrEmail, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });

    if (!user) {
      return res.status(HttpResponses.BAD_REQUEST).send({
        errorsMessages: [
          {
            message: "User is not found",
            field: "user",
          },
        ],
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(HttpResponses.UNAUTHORIZED);
    }

    return res.status(HttpResponses.NO_CONTENT);
  }
);
