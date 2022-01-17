import { httpServer } from "../../expressServer";
import axios from "axios";
describe("Route test", () => {
  beforeAll(() => {
    httpServer.listen(3006);
  });
  test("Test", async () => {
    try {
      const data = await axios.get("http://localhost:3006/v1/test");
      expect(data.data).toBe("OK");
    } catch (error) {
      console.error(error);
      expect(error).toBe(undefined);
    }
  });
  afterAll(() => httpServer.close());
});
