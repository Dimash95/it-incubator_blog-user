import express, { Request, Response } from "express";
import { HttpResponses } from "../../const";
import { loginValidation } from "./validation";

export const authRouter = express.Router();

authRouter.post("/", loginValidation, async (req: Request, res: Response) => {
  const { loginOrEmail, password } = req.body;

  return res.status(HttpResponses.NO_CONTENT);
});
