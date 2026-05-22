import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import config from "../config";
import jwt from "jsonwebtoken"
import { pool } from "../db";
export const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(req.method, Date.now())
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json(
        {
          success: false,
          message: "unauthorized access!!!"
        })
    }
    const decoded = jwt.verify(
      token as string,
      config.secret as string,
    ) as JwtPayload;
    console.log(decoded)
    const userData = await pool.query(`
    
    SELECT * FROM users WHERE email=$1
    `, [decoded.email])
    const user = userData.rows[0];

    if (userData.rows[0].length === 0) {
      res.status(404).json(
        {
          success: false,
          message: "User not found!!!"
        })
    }
    if (!user.is_active) {
      res.status(404).json(
        {
          success: false,
          message: "Forbidden!!!"
        })
    }
    req.user = decoded;

    next()


  } catch (error) {
    next(error)
  }
}