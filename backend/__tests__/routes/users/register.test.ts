import { httpServer } from "../../../expressServer";
import axios from "axios";
describe("login test", () => {
  beforeAll(() => {
    httpServer.listen(3004);
  });
  test("Returns 400 on bad data.", async () => {
    const data = await axios.post("http://localhost:3004/v1/users/login");
    expect(data.status).toBe(400);
  });
  test("Returns 200 on good registration", async () => {
    const data = await axios.post("http://localhost:3004/v1/users/login", {
      email: "email@email.com",
      password: "password",
      userName: "userName"
    });
    expect(data.status).toBe(200);
  });
  afterAll(() => httpServer.close());
});
