import { Response, Request } from "express";
import logger from "../lib/logger";
export default function test(req: Request, res: Response) {
  res.sendStatus(200);
  logger.logDebug("Test route called.");
}
