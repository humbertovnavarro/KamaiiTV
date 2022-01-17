import { UserToken, UserRegistration, UserLogin, UserTokenSignable } from "../types";

function isPositiveInt(value: unknown): boolean {
  return typeof value === "number"
    && value % 1 === 0
    && value > 0;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserToken(data: any): data is UserToken {
  if(typeof data !== "object") {
    return false;
  }
  return Object.keys(data).length === 4
  && typeof data.username === "string"
  && isPositiveInt(data.id)
  && isPositiveInt(data.iat)
  && isPositiveInt(data.exp);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserRegistration(data: any): data is UserRegistration {
  if (typeof data !== "object") {
    return false;
  }
  return Object.keys(data).length === 4
    && typeof data.userName === "string"
    && typeof data.email === "string"
    && typeof data.password === "string";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserLogin(data: any): data is UserLogin {
  if (typeof data !== "object") {
    return false;
  }
  const numKeys = Object.keys(data).length;
  return numKeys === 2 || numKeys === 3
    && typeof data.userName === "string"
    && (typeof data.email === "string" || typeof data.password === "string");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserTokenSignable(data: any): data is UserTokenSignable {
  if (typeof data !== "object") {
    return false;
  }
  const numKeys = Object.keys(data).length;
  return numKeys === 2 || numKeys === 3
    && typeof data.userName === "string"
    && (typeof data.email === "string" || typeof data.password === "string");
}


export { isPositiveInt, isUserToken, isUserRegistration, isUserLogin, isUserTokenSignable };
