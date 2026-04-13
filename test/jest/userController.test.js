const controller = require("../../controllers/userController");

const mockRes = () => {
  const res = {};
  res.send = jest.fn();
  return res;
};

describe("getUser", () => {
  it("returns 'Successful get api operation'", () => {
    const req = { body: { name: "John" } };
    const res = mockRes();
    controller.getUser(req, res);
    expect(res.send).toHaveBeenCalledWith("Successful get api operation");
  });

  it("logs the request body", () => {
    const req = { body: { test: "data" } };
    const res = mockRes();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    controller.getUser(req, res);
    expect(consoleSpy).toHaveBeenCalledWith(req.body);
    consoleSpy.mockRestore();
  });

  it("handles empty body without throwing", () => {
    const req = { body: {} };
    const res = mockRes();
    expect(() => controller.getUser(req, res)).not.toThrow();
  });
});

describe("postUser", () => {
  it("returns 'New user created'", () => {
    const req = { body: { firstName: "Akshay", lastName: "Wayangankar", age: 27 } };
    const res = mockRes();
    controller.postUser(req, res);
    expect(res.send).toHaveBeenCalledWith("New user created");
  });

  it("returns success message even with partial body fields", () => {
    const req = { body: { firstName: "Akshay" } };
    const res = mockRes();
    controller.postUser(req, res);
    expect(res.send).toHaveBeenCalledWith("New user created");
  });

  it("returns success message with empty body", () => {
    const req = { body: {} };
    const res = mockRes();
    controller.postUser(req, res);
    expect(res.send).toHaveBeenCalledWith("New user created");
  });

  it("does not throw when age is missing from body", () => {
    const req = { body: { firstName: "Akshay", lastName: "Wayangankar" } };
    const res = mockRes();
    expect(() => controller.postUser(req, res)).not.toThrow();
  });
});

describe("editUser", () => {
  it("returns 'User data successfully edited'", () => {
    const req = { params: { id: "123" }, body: {} };
    const res = mockRes();
    controller.editUser(req, res);
    expect(res.send).toHaveBeenCalledWith("User data successfully edited");
  });

  it("logs the entire req object instead of req.params.id (BUG: path var assigned wrong)", () => {
    // BUG: controller assigns entire req to `path` and logs that instead of req.params.id
    const req = { params: { id: "123" }, body: {} };
    const res = mockRes();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    controller.editUser(req, res);
    // Current behavior: logs entire req, not just req.params.id
    expect(consoleSpy).toHaveBeenCalledWith("path", req);
    consoleSpy.mockRestore();
  });
});

describe("deleteUser", () => {
  it("returns 'User data successfully deleted'", () => {
    const req = { params: { id: "456" }, body: {} };
    const res = mockRes();
    controller.deleteUser(req, res);
    expect(res.send).toHaveBeenCalledWith("User data successfully deleted");
  });

  it("logs the entire req object instead of req.params.id (BUG: path var assigned wrong)", () => {
    // BUG: same issue as editUser
    const req = { params: { id: "456" }, body: {} };
    const res = mockRes();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    controller.deleteUser(req, res);
    expect(consoleSpy).toHaveBeenCalledWith("path", req);
    consoleSpy.mockRestore();
  });
});
