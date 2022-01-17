import { isPositiveInt, isUserToken } from "../../lib/validators";
describe("All validators work as intended", () => {
  test("isPositiveInt", () => {
    expect(isPositiveInt(1)).toBe(true);
    expect(isPositiveInt(0)).toBe(false);
    expect(isPositiveInt(-1)).toBe(false);
    expect(isPositiveInt("1")).toBe(false);
    expect(isPositiveInt(1.1)).toBe(false);
    expect(isPositiveInt(NaN)).toBe(false);
    expect(isPositiveInt("lmao")).toBe(false);
  });
  test("validateUserToken", () => {
    expect(isUserToken({ id: 1, username: "lmao" })).toBe(false);
    expect(isUserToken({ id: "no", username: "lmao123" })).toBe(false);
  });
});
