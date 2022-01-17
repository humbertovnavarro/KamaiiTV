import { Request, Response } from "express";
import { isUserLogin, isUserTokenSignable } from "../../lib/validators";
import { UserLogin, UserTokenSignable } from "../../types";
import db from "../../lib/db";
import { signToken } from "../../lib/tokens";
export default async function login(req: Request, res: Response) {
  let login: UserLogin;
  let query: string;
  let search: string;
  if (isUserLogin(req.body)) {
    login = req.body;
  } else {
    return res.sendStatus(400);
  }
  if(login.email) {
    query = `
      SELECT hash, userId, userName from users where "email" = ?
    `;
    search = login.email;
  }
  else if(login.userName) {
    query = `
      SELECT hash, userId, userName from users where "userName" = ?
    `;
    search = login.userName;
  } else {
    return res.sendStatus(500);
  }
  try {
    const dbRes = await db.query(query, [search]);
    let sign: UserTokenSignable;
    if(isUserTokenSignable(dbRes.rows[0])) {
      sign = dbRes.rows[0];
    } else {
      return res.sendStatus(500);
    }
    const token = signToken(sign);
    return res.json(token);
  } catch (err) {
    return res.sendStatus(500);
  }
}
