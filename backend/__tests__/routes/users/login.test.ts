import { httpServer } from "../../../expressServer";
import axios from "axios";
describe("login test", () => {
  beforeAll(() => {
    httpServer.listen(3005);
  });
  test("Test", () => {
    expect(true).toBe(true);
  });
  afterAll(() => httpServer.close());
});
