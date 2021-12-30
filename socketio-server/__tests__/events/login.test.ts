import { Socket, User } from  "../../types";
import { Server, Socket as ServerSocket } from "socket.io";
import ioClient, { Socket as ClientSocket } from "socket.io-client";
import config from "../../config.json";
import jwt from "jsonwebtoken";
import login from "../../events/login";

const payload = {
  username: "kamaii",
  id: 1
}

jest.setTimeout(300);
describe("Login tests", () => {
  let JWT = jwt.sign(payload, config.secret, { expiresIn: "1h"} );
  let expiredJWT = jwt.sign(payload, config.secret, { expiresIn: "-1h" });
  let io: Server;
  let serverSocket: Socket;
  let clientSocket: ClientSocket;

  beforeAll((done) => {
    io = new Server({});
    io.listen(4001);
    clientSocket = ioClient("http://localhost:4001");
    io.on("connection", sock => {
      serverSocket = sock as Socket;
      login(sock);
      done();
    });
  });

  afterAll((done) => {
    io.close();
    clientSocket.close();
    done();
  });

  beforeEach(() => {
    clientSocket.removeAllListeners();
  });

  test("On bad token: Returns 400 and socket user remains undefined", (done) => {
    clientSocket.on("login", (data: any) => {
      expect(data).toBe(400);
      expect(serverSocket.user).toBeFalsy();
      done();
    });
    clientSocket.emit("login", "badToken")
  });

  test("On expired token: Returns 400 and socket user remains undefined", (done) => {
    clientSocket.on("login", (data: any) => {
      expect(data).toBe(400);
      expect(serverSocket.user).toBeFalsy();
      done();
    });
    clientSocket.emit("login", expiredJWT)
  });

  test("On good token: Sets user property of socket to user and returns 200", (done) => {
    clientSocket.on("login", (data: any) => {
      expect(data).toBe(200);
      expect(serverSocket.user).toBeTruthy();
      expect(serverSocket.user?.username).toBe(payload.username);
      expect(serverSocket.user?.id).toBe(1);
      expect(serverSocket.user?.iat).toBeTruthy();
      expect(serverSocket.user?.exp).toBeTruthy();
      done();
    });
    clientSocket.emit("login", JWT);
  });

});
