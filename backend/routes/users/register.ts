import { Request, Response } from "express";
import db from "../../lib/db";
import argon2 from "argon2";
import { signToken } from "../../lib/tokens";
import { UserRegistration, UserTokenSignable } from "../../types";
import { isUserRegistration } from "../../lib/validators";
import logger from "../../lib/logger";
export default async function register(req: Request, res: Response) {
  let registration: UserRegistration;
  let hash: string;
  if(isUserRegistration(req.body)) {
    registration = req.body;
  } else {
    logger.logInfo("Bad registration data.", req.body);
    return res.sendStatus(400);
  }
  const { userName, email, password } = registration;
  try {
    hash = await argon2.hash(password);
    const dbRes = await db.query(
      `
        INSERT INTO users(userName, email, hash)
        VALUES (?, ?, ?)
        returning userId;
      `
      , [userName, email, hash]);
    const { userId } = dbRes.rows[0];
    const sign: UserTokenSignable = {
      userId,
      userName
    };
    const token = signToken(sign);
    if(!token) {
      logger.logError("Failed to sign token");
      return res.sendStatus(500);
    }
    return res.json(token);
  } catch (err) {
    logger.logError(err);
    return res.sendStatus(500);
  }
}
