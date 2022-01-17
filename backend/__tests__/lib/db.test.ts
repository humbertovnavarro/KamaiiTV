import pg from "../../lib/db";
import dotenv from "dotenv";
dotenv.config();
describe("Database connects properly", () => {
  test("Database connects", (done) => {
    if(process.env.DEVMODE === "true") {
      done();
      return;
    }
    pg.query("SELECT 1").then((data) => {
      done();
      expect(data.rowCount).toBe(1);
    }).catch( err => {
      done();
      console.error(err);
      fail();
    });
  });
  afterAll(() => {
    pg.end();
  });
});
