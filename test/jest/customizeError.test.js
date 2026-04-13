const { JoiCustomeErrors } = require("../../SchemaValidation/customizeError");

describe("JoiCustomeErrors", () => {
  it("formats a 'required' error correctly", () => {
    const errors = [
      { type: "any.required", context: { key: "firstName" }, message: '"firstName" is required' },
    ];
    const result = JoiCustomeErrors(errors);
    expect(result).toEqual(["Error:Required firstName\n"]);
  });

  it("formats an 'empty' error correctly", () => {
    const errors = [
      { type: "string.empty", context: { key: "email" }, message: '"email" is not allowed to be empty' },
    ];
    const result = JoiCustomeErrors(errors);
    expect(result).toEqual(["Error:Please enter email\n"]);
  });

  it("returns raw Joi message for unknown error type suffix", () => {
    const errors = [
      { type: "string.email", context: { key: "email" }, message: '"email" must be a valid email' },
    ];
    const result = JoiCustomeErrors(errors);
    expect(result).toEqual(['"email" must be a valid email\n']);
  });

  it("handles an array of multiple errors", () => {
    const errors = [
      { type: "any.required", context: { key: "firstName" }, message: '"firstName" is required' },
      { type: "string.empty", context: { key: "lastName" }, message: '"lastName" is not allowed to be empty' },
      { type: "string.email", context: { key: "email" }, message: '"email" must be valid' },
    ];
    const result = JoiCustomeErrors(errors);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe("Error:Required firstName\n");
    expect(result[1]).toBe("Error:Please enter lastName\n");
    expect(result[2]).toBe('"email" must be valid\n');
  });

  it("returns empty array for empty input", () => {
    const result = JoiCustomeErrors([]);
    expect(result).toEqual([]);
  });

  it("falls to default case when type has no dot", () => {
    const errors = [
      { type: "required", context: { key: "mobNo" }, message: '"mobNo" is required' },
    ];
    const result = JoiCustomeErrors(errors);
    // type.indexOf(".") returns -1, substring(0, length) = full type = "required"
    // switch matches "required" case
    expect(result).toEqual(["Error:Required mobNo\n"]);
  });

  it("handles undefined type by falling to default case", () => {
    const errors = [
      { type: undefined, context: { key: "age" }, message: "age is invalid" },
    ];
    // ErrType will be "" (empty string), hits default case
    const result = JoiCustomeErrors(errors);
    expect(result).toEqual(["age is invalid\n"]);
  });

  it("includes 'undefined' in output when context.key is undefined", () => {
    // BUG: context.key is missing — current behavior produces "Error:Required undefined\n"
    const errors = [
      { type: "any.required", context: { key: undefined }, message: "field is required" },
    ];
    const result = JoiCustomeErrors(errors);
    expect(result).toEqual(["Error:Required undefined\n"]);
  });
});
