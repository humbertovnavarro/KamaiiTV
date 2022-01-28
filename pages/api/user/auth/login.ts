import requestIp from "request-ip";
import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../../_types.d.";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../../../../lib/prismaClient";
const SECRET = process.env.JWT_SECRET;
import {
  propertyValidator,
  ValidatorType,
  validUsername,
} from "../../../../lib/validators";
import dotenv from "dotenv";
dotenv.config();
const validEmail = propertyValidator({
  type: ValidatorType.String,
  key: "email",
});
const validPassword = propertyValidator({
  type: ValidatorType.String,
  key: "hashedPassword",
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<string>>
) {
  if (!SECRET) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
  const emailError = validEmail(req);
  const usernameError = validUsername(req);
  if (usernameError && emailError) {
    return res.status(400).json(usernameError);
  }
  const passwordError = validPassword(req);
  if (passwordError) {
    return res.status(400).json(passwordError);
  }
  const { username, hashedPassword, email } = req.body;
  if (!username || !hashedPassword || !email) {
    res.status(500).json({ error: "Internal server error" });
  }
  let dbUser = await prisma.user.findFirst({
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
    dbUser = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        password: true,
      },
    });
  }
  if (!dbUser) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }
  const valid = await argon2.verify(dbUser.password, hashedPassword);
  if (!valid) {
    return res.status(401).json({
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
  res.status(200).json({
    error: "ok",
    data: token,
  });
}
