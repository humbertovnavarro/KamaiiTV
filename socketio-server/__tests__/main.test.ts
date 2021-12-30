jest.setTimeout(300);
import server from "../main";
import io, { Socket } from "socket.io-client";
const testPort = 3215;
describe("Socket IO runs without crashing", () => {
  let socket: Socket;
  beforeAll((done) => {
    server.listen(testPort);
    socket = io("http://localhost:" + testPort);
    done();
  });
  afterAll(done => {
    socket.disconnect();
    server.close();
    done();
  })
  test("socket connects", (done) => {
    socket.on("connect", () => { done()})
  })
});
