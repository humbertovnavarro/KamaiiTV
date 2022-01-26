import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Stream } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stream[]>
) {
  const streams = await prisma.stream.findMany();
  res.status(200).json(streams);
}
