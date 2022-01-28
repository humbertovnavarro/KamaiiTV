import { NextApiRequest, NextApiResponse } from 'next';
import { json } from 'stream/consumers';
import handler from './register';
jest.mock("../../../../repositories/UserRepository");
describe("api/user/auth/register", () => {
  test("Handled empty body", (done) => {
    const json = jest.fn();
    const res = {
      status: jest.fn(() => {
        return {
          json
        }
      })
    } as unknown as NextApiResponse
    handler({} as NextApiRequest, res).then(() =>{
      done();
      expect(res.status).toBeCalledWith(400)
      expect(json).toBeCalledWith({error: "no data"})
    });
  });

  test("Handled valid user", async () => {
    const json = jest.fn();
    const res = {
      status: jest.fn(() => {
        return {
          json
        }
      })
    } as unknown as NextApiResponse
    const req = {
      body: {
        username: "sussy",
        password: "amongus",
        email: "amongusamongus@amongus.com"
      }
    }
    await handler(req as NextApiRequest, res);
    expect(res.status).toBeCalledWith(200);
    expect(json).toBeCalledWith({ "error": "ok" });
  });
})
