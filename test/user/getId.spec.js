const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("GET /user/:id", () => {
  let userId;
  let token;

  beforeAll(async () => {
    const user = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@getid.com",
      password: "123456",
    });

    userId = user.body.id;

    const response = await request(app)
      .post("/user/login")
      .send({ email: "walter@getid.com", password: "123456" });

    token = response.body.token;
  });

  afterAll(async () => {
    await knex("users").whereIn("email", ["walter@getid.com"]).del();
  });

  it("should find user by ID", async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Walter Netto");
    expect(response.body.email).toBe("walter@getid.com");
    expect(response.body.id).toBe(userId);
  });

  it("should return error message for non-existing user", async () => {
    const response = await request(app)
      .get("/user/999999")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("should return error message for invalid ID format", async () => {
    const response = await request(app)
      .get("/user/string")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid ID format");
  });
});
