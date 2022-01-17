import { httpServer } from "./expressServer";
import setup from "./ioServer";
import dotenv from "dotenv";
import logger from "./lib/logger";
dotenv.config();
setup(httpServer);
if(require.main === module) {
  try {
    httpServer.listen(process.env.PORT);
    logger.logInfo(`Listening on port ${process.env.PORT}`);
  } catch(err) {
    logger.logFatal("Error starting server", err);
    process.exit(1);
  }
}
export default httpServer;
