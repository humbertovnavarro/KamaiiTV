import SimpleLogger, { CustomLogger } from "./SimpleLogger";
import dotenv from "dotenv";
dotenv.config();
import { ConsoleLogger, FileLogger } from "./SimpleLogger";
const logger = new SimpleLogger({
  logLevel: process.env.DEVMODE ? 0 : 2,
});
logger.use(ConsoleLogger());
logger.use(FileLogger("log.txt"));

export default logger;
