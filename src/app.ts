import express, { type Application, type Request, type Response } from "express";
import { json } from "node:stream/consumers";
import { Pool } from "pg";
import config from "./config";
import { pool } from "./db";
import { userRouter } from "./modules/users/user.route";
import { profile } from "console";
import { profileRouter } from "./modules/profile/profile.route";
import { loginRouter } from "./modules/auth/auth.router";
import fs from "fs";
import logger from "./middleware/logger";
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World I Am User!')
  res.status(200).json({
    message: "Express Level",
    "author": "Next level"
  })
})
app.use(logger);
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users",userRouter);
app.use("/api/profile",profileRouter);
app.use("/api/auth",loginRouter)

export default app;