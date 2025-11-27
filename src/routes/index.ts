import express from "express";
import { dropRouter } from "./drop";
import { authRouter } from "./login";
import { blogsRouter } from "./blogs";
import { postsRouter } from "./posts";
import { usersRouter } from "./users";

export const apiRouter = express.Router();

apiRouter.use("/testing/all-data", dropRouter);
apiRouter.use("/auth/login", authRouter);
apiRouter.use("/blogs", blogsRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/users", usersRouter);
