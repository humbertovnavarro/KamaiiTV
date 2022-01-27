import { PrismaClient } from "@prisma/client";
import requestIp from "request-ip";
import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../../_types.d.";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  propertyValidator,
  ValidatorType,
  validUsername,
} from "../../../../lib/validators";
const validEmail = propertyValidator({
  type: ValidatorType.String,
  key: "email",
});
const validPassword = propertyValidator({
  type: ValidatorType.String,
  key: "hashedPassword",
});
dotenv.config();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<string>>
) {
  const SECRET = process.env.JWT_SECRET;
  if (!SECRET) {
    return res.status(500).send({
      error: "Internal server error",
    });
  }
  const emailError = validEmail(req);
  const usernameError = validUsername(req);
  if (usernameError && emailError) {
    return res.status(400).send(usernameError);
  }
  const passwordError = validPassword(req);
  if (passwordError) {
    return res.status(400).send(passwordError);
  }
  const { username, hashedPassword, email } = req.body;
  if (!username || !hashedPassword || !email) {
    res.status(500).send({ error: "Internal server error" });
  }
  const prisma = new PrismaClient();
  const dbUser = await prisma.user.findFirst({
    where: {
      usernameLower: {
        equals: username.toLowerCase(),
      },
    },
    select: {
      password: true,
    },
  });
  if (!dbUser) {
    return res.status(401).send({
      error: "Invalid username or password",
    });
  }
  const valid = await argon2.verify(dbUser.password, hashedPassword);
  if (!valid) {
    return res.status(401).send({
      error: "Invalid username or password",
    });
  }
  const ip = requestIp.getClientIp(req);
  const token = jwt.sign(
    {
      username,
      email,
      ip,
    },
    SECRET,
    {
      expiresIn: "14d",
    }
  );
  res.status(200).send({
    error: "ok",
    data: token,
  });
}
