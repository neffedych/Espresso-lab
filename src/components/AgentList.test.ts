import { validateEmail } from "./AgentList";


describe("validateEmail", () => {
  test("valid email should return true", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  test("invalid email should return false", () => {
    expect(validateEmail("invalid-email")).toBe(false);
  });

  test("empty email should return false", () => {
    expect(validateEmail("")).toBe(false);
  });

  test("email without @ symbol should return false", () => {
    expect(validateEmail("testexample.com")).toBe(false);
  });

  });

