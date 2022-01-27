import handler from "../../../../../pages/api/user/auth/register";
import { NextApiResponse, NextApiRequest } from "next/types";
import { prismaMock } from '../../../../__mocks__/prisma/singleton';
import argon2 from 'argon2';
  //Test covers all other validators in lib/validators as well since they are all based on the same logic
describe("registration route", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return a resp object with good data", async () => {
    const sendFunction = jest.fn();
    const status = jest.fn(() => {
      return {
        send: sendFunction
      };
    });
    const res = {
      status
    } as unknown as NextApiResponse;
    const req = {
      body: {
        username: "test",
        hashedPassword: "test",
        email: "test@test.com"
      }
    } as NextApiRequest;
    jest.spyOn(argon2, 'hash').mockResolvedValue('outputpassword');
    await handler(req, res, prismaMock);
    expect(sendFunction).toBeCalledWith({
      error: "ok"
    });
    expect(status).toBeCalledWith(200);
    expect(prismaMock.user.create).toBeCalledWith({
      data: {
        username: "test",
        usernameLower: "test",
        password: "outputpassword",
        email: "test@test.com"
      },
    });
  });
  it("should return invalid username error", async () => {
    const sendFunction = jest.fn();
    const status = jest.fn(() => {
      return {
        send: sendFunction
      };
    });
    const res = {
      status
    } as unknown as NextApiResponse;
    const usernameNumber = {
      body: {
        username: 1234,
        hashedPassword: "test",
        email: "test@test.com"
      }
    } as NextApiRequest;
    const usernameTooShort = {
      body: {
        username: "e",
        hashedPassword: "test",
        email: "test@test.com"
      }
    } as NextApiRequest
    const usernameTooLong = {
      body: {
        username: "thisiswaytoolongthisiswaytoolongthisiswaytoolong",
        hashedPassword: "test",
        email: "test@test.com"
      }
    } as NextApiRequest;
    // Username wrong type
    await handler(usernameNumber, res, prismaMock);
    expect(sendFunction).toBeCalledWith({
      error: "Property username must comform to /^[a-zA-Z0-9_]{3,20}$/"
    });
    expect(status).toBeCalledWith(400);
    expect(prismaMock.user.create).not.toBeCalled();
    // Username too short
    await handler(usernameTooShort, res, prismaMock);
    expect(sendFunction).toBeCalledWith({
      error: "Property username must comform to /^[a-zA-Z0-9_]{3,20}$/"
    });
    expect(status).toBeCalledWith(400);
    expect(prismaMock.user.create).not.toBeCalled();
    // Username too long
    await handler(usernameTooLong, res, prismaMock);
    expect(sendFunction).toBeCalledWith({
      error: "Property username must comform to /^[a-zA-Z0-9_]{3,20}$/"
    });
    expect(status).toBeCalledWith(400);
    expect(prismaMock.user.create).not.toBeCalled();
  });
});
