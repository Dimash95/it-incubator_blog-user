import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { UserModel } from "./model";
import { basicAuth } from "../../middlewares/auth";
import { inputValidation } from "../../middlewares/input-validation";
import { HttpResponses } from "../../const";
import { userValidation } from "./validation";

export const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
  let {
    searchLoginTerm = null,
    searchEmailTerm = null,
    sortBy = "createdAt",
    sortDirection = "desc",
    pageNumber = 1,
    pageSize = 10,
  } = req.query;

  pageSize = +pageSize;
  pageNumber = +pageNumber;

  const sortCreatedAt = () => (sortDirection === "asc" ? "asc" : "desc");

  const users = await UserModel.find({
    login: { $regex: searchLoginTerm, $options: "i" },
    email: { $regex: searchEmailTerm, $options: "i" },
  }).sort({
    [`${sortBy}`]: sortCreatedAt(),
  });

  const totalCount = users.length;
  const pagesCount = Math.ceil(totalCount / pageSize);

  const filteredUsers = users.slice(
    (pageNumber - 1) * pageSize,
    (pageNumber - 1) * pageSize + pageSize
  );

  const mappedUser = () =>
    filteredUsers.map((user) => {
      const { password, ...rest } = user;
      return { ...rest };
    });

  const result = {
    pagesCount,
    page: pageNumber,
    pageSize,
    totalCount,
    items: mappedUser,
  };

  res.status(HttpResponses.OK).send(result);
});

usersRouter.post(
  "/",
  basicAuth,
  userValidation,
  inputValidation,
  async (req: Request, res: Response) => {
    const { login, password, email } = req.body;

    const users = await UserModel.find();

    for (const user of users) {
      if (user.login === login) {
        return res.status(HttpResponses.BAD_REQUEST).send({
          errorsMessages: [
            {
              message: "login should be unique",
              field: "login",
            },
          ],
        });
      }
    }

    for (const user of users) {
      if (user.email === email) {
        return res.status(HttpResponses.BAD_REQUEST).send({
          errorsMessages: [
            {
              message: "email should be unique",
              field: "email",
            },
          ],
        });
      }
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await UserModel.create({
      login,
      password: hashedPassword,
      email,
    });

    return res.status(HttpResponses.CREATED).send(newUser);
  }
);

usersRouter.delete("/:id", basicAuth, async (req, res) => {
  const deleted = await UserModel.findByIdAndDelete(req.params.id);

  if (!deleted)
    return res.status(HttpResponses.NOT_FOUND).send({
      errorsMessages: [
        {
          message: "User not found",
          field: "id",
        },
      ],
    });

  return res.sendStatus(HttpResponses.NO_CONTENT);
});
