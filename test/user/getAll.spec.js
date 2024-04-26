const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("GET /user", () => {
  let token;

  beforeAll(async () => {
    await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@getall.com",
      password: "123456",
    });

    await request(app).post("/user").send({
      name: "Renata Medeiros",
      email: "renata@getall.com",
      password: "654321",
    });

    const response = await request(app)
      .post("/user/login")
      .send({ email: "walter@getall.com", password: "123456" });

    token = response.body.token;
  });

  afterAll(async () => {
    await knex("users")
      .whereIn("email", ["walter@getall.com", "renata@getall.com"])
      .del();
  });

  it("should find all users", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
  });
});
