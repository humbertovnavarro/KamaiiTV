import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../_types.d.";
import argon2 from "argon2";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<undefined>>
) {
  const { username, hashedPassword, email } = req.body;

  if (!username || typeof username != 'string') {
    return res.status(400).send({
      error: "Invalid username"
    })
  }
  if (!hashedPassword || typeof hashedPassword != 'string') {
    return res.send({
      error: "Invalid password"
    })
  }
  if (!email || typeof email != 'string') {
    return res.send({
      error: "Invalid email"
    })
  }
  const prisma = new PrismaClient();
  const password = await argon2.hash(hashedPassword);
  const exists = await prisma.user.findFirst({
    where: {
      usernameLower: {
        equals: username.toLowerCase(),
      }
    },
    select: {
      username: true
    }
  });
  if (exists) {
    return res.status(409).send({
      error: `Username "${exists.username}" already exists`
    });
  }
  const user = await prisma.user.create({
    data: {
      username,
      usernameLower: username.toLowerCase(),
      password,
    },
    select: {
      id: true
    }
  })
  await prisma.email.create({
    data: {
      email: email,
      userId: user.id,
    }
  })
  res.status(200).json({
    error: "ok"
  })
}
