import SimpleLogger, { ConsoleLogger, FileLogger } from "../../lib/SimpleLogger";
describe("Logger works", () => {
  test("Logger works", (done) => {
    const logger = new SimpleLogger({
      logLevel: 1,
    });
    logger.use(ConsoleLogger());
    logger.use(FileLogger("test.txt"));
    expect(logger.logFunctions?.length).toBe(1);
    done();
  });
});
