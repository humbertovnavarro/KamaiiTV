import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../../_types.d.";
import argon2 from "argon2";
import { validEmail, validUsername, validPassword } from "../../../../lib/validators";
import prisma from "../../../../lib/prismaClient";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<undefined>>
) {
  const { username, hashedPassword, email } = req.body;
  const invalidUsernameError = validUsername(req);
  const invalidEmailError = validEmail(req);
  const invalidPasswordError = validPassword(req);
  if (invalidUsernameError || invalidEmailError || invalidPasswordError) {
    const error = invalidEmailError || invalidUsernameError || invalidPasswordError;
    return res.status(400).json(error as Response<undefined>);
  }
  const password = await argon2.hash(hashedPassword);
  const exists = await prisma.user.findFirst({
    where: {
      usernameLower: {
        equals: username.toLowerCase(),
      },
    },
    select: {
      username: true,
    },
  });
  if (exists) {
    return res.status(409).json({
      error: `Username "${exists.username}" already exists`,
    });
  }
  await prisma.user.create({
    data: {
      username,
      usernameLower: username.toLowerCase(),
      password,
      email,
    },
    select: {
      id: true,
    },
  });
  res.status(200).json({
    error: "ok",
  });
}
