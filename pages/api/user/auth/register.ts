import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../../_types.d.";
import argon2 from "argon2";
import { validEmail, validUsername, validPassword } from "../../../../lib/validators";
import UserRepository from "../../../../repositories/UserRepository";
export interface RegistrationUser {
  username: string;
  usernameLower: string;
  password: string;
  email: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<undefined>>
) {
  try {
    const invalidUsernameError = validUsername(req);
    const invalidEmailError = validEmail(req);
    const invalidPasswordError = validPassword(req);
    if (invalidUsernameError || invalidEmailError || invalidPasswordError) {
      const error = invalidEmailError || invalidUsernameError || invalidPasswordError;
      return res.status(400).json(error as Response<undefined>);
    }
    const { username, password, email } = req.body;
    const hash = await argon2.hash(password);
    if (await UserRepository.findUserByUsername(username)) {
      return res.status(400).json({ error: "username already exists"});
    }
    try {
      await UserRepository.createUser({
        username,
        password: hash,
        usernameLower: username.toLowerCase(),
        email
      });
    } catch(e) {
      return res.status(500).json({error: "internal server error"});
    }
    return res.status(200).json({ error: "ok" });
  } catch(e) {
    console.error(e);
    return res.status(500).json({ error: "internal server error" });
  }
}
