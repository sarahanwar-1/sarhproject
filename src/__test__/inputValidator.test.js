import { isValidLink } from "../src/client/js/inputValidator";

// Test case for the isValidLink function
describe("Testing the URL validation function", () => {
  test("should return true for valid URL", () => {
    const validUrl = "https://www.example.com";
    expect(isValidLink(validUrl)).toBe(true);
  });

  test("should return false for invalid URL", () => {
    const invalidUrl = "htp://invalid-url";
    expect(isValidLink(invalidUrl)).toBe(false);
  });

  test("should return false for empty URL", () => {
    const emptyUrl = "";
    expect(isValidLink(emptyUrl)).toBe(false);
  });
});
