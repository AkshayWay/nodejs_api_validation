const SchemaValidation = require("../../SchemaValidation");

const validBody = () => ({
  firstName: "Akshay",
  lastName: "Wayangankar",
  age: 27,
  gender: "M",
  checkBoolean: true,
  mobNo: "9876543210",
  sports: [{ name: "Cricket", players: 11 }],
  email: "hi@akshaywayangankar.com",
  hobbies: ["Reading", "Coding"],
});

const mockReq = (body, url = "/user") => ({ body, originalUrl: url });

const mockRes = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("apiValidation middleware", () => {
  let next;

  beforeEach(() => {
    next = jest.fn();
  });

  it("calls next() with no args when /user body is valid", async () => {
    const req = mockReq(validBody());
    const res = mockRes();
    await SchemaValidation.apiValidation(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
    expect(res.send).not.toHaveBeenCalled();
  });

  it("sends 400 error object when required field is missing", async () => {
    const body = validBody();
    delete body.firstName;
    const req = mockReq(body);
    const res = mockRes();
    await SchemaValidation.apiValidation(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    const sentPayload = res.send.mock.calls[0][0];
    expect(sentPayload.statusCode).toBe(400);
    expect(typeof sentPayload.data).toBe("string");
  });

  it("error message contains the missing field name", async () => {
    const body = validBody();
    delete body.firstName;
    const req = mockReq(body);
    const res = mockRes();
    await SchemaValidation.apiValidation(req, res, next);
    const sentPayload = res.send.mock.calls[0][0];
    expect(sentPayload.data).toContain("firstName");
  });

  it("collects all field errors when multiple fields are missing (abortEarly: false)", async () => {
    const req = mockReq({});
    const res = mockRes();
    await SchemaValidation.apiValidation(req, res, next);
    const sentPayload = res.send.mock.calls[0][0];
    expect(sentPayload.statusCode).toBe(400);
    // Multiple required fields — should mention more than one
    expect(sentPayload.data).toContain("firstName");
    expect(sentPayload.data).toContain("lastName");
  });

  it("sends 400 for invalid gender value", async () => {
    const req = mockReq({ ...validBody(), gender: "X" });
    const res = mockRes();
    await SchemaValidation.apiValidation(req, res, next);
    const sentPayload = res.send.mock.calls[0][0];
    expect(sentPayload.statusCode).toBe(400);
  });

  it("sends 400 for invalid email format", async () => {
    const req = mockReq({ ...validBody(), email: "not-an-email" });
    const res = mockRes();
    await SchemaValidation.apiValidation(req, res, next);
    const sentPayload = res.send.mock.calls[0][0];
    expect(sentPayload.statusCode).toBe(400);
  });

  it("sends 400 for invalid mobNo (too short)", async () => {
    const req = mockReq({ ...validBody(), mobNo: "12345" });
    const res = mockRes();
    await SchemaValidation.apiValidation(req, res, next);
    const sentPayload = res.send.mock.calls[0][0];
    expect(sentPayload.statusCode).toBe(400);
  });

  it("logs 'No URL Match' and throws TypeError for unmatched URL (BUG)", async () => {
    // BUG: unmatched URLs leave pathParms undefined → TypeError on validateAsync
    const req = mockReq(validBody(), "/unknown");
    const res = mockRes();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    await expect(SchemaValidation.apiValidation(req, res, next)).rejects.toThrow(TypeError);
    expect(consoleSpy).toHaveBeenCalledWith("No URL Match");
    consoleSpy.mockRestore();
  });
});
