const request = require("supertest");
const app = require("../../src/app");
const jwt = require("jsonwebtoken");
const knex = require("../../src/database/connection");

describe("Authorization Middleware", () => {
  let token;

  beforeAll(async () => {
    const user = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@auth.com",
      password: "123456",
    });

    const response = await request(app)
      .post("/user/login")
      .send({ email: "walter@auth.com", password: "123456" });

    token = response.body.token;
  });

  afterAll(async () => {
    await knex("users").whereIn("email", ["walter@auth.com"]).del();
  });

  it("should allow access with a valid token", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should deny access with an invalid token", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", "Bearer invalidToken");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid token");
  });

  it("should deny access without a token", async () => {
    const response = await request(app).get("/user");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No authorization header provided");
  });
});
