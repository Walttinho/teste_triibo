const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("GET /user/:id", () => {
  let userIdOne;

  beforeAll(async () => {
    const [id1] = await knex("users").insert(
      {
        name: "Walter Netto",
        email: "walter@example.com",
        password: "123456",
      },
      ["id"]
    );

    userIdOne = id1;
  });

  afterAll(async () => {
    await knex("users").whereIn("email", ["walter@example.com"]).del();
  });

  it("should find user by ID", async () => {
    const response = await request(app).get(`/user/${userIdOne}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Walter Netto");
    expect(response.body.email).toBe("walter@example.com");
    expect(response.body.id).toBe(userIdOne);
  });

  it("should return error message for non-existing user", async () => {
    const response = await request(app).get("/user/999999");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User not found");
  });

  it("should return error message for invalid ID format", async () => {
    const response = await request(app).get("/user/string");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid ID format");
  });
});
