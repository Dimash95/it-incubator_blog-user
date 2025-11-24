import express from "express";
import { dropRouter } from "./drop";
import { blogsRouter } from "./blogs";
import { postsRouter } from "./posts";
import { authRouter } from "./login";

export const apiRouter = express.Router();

apiRouter.use("/testing/all-data", dropRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/blogs", blogsRouter);
apiRouter.use("/posts", postsRouter);
