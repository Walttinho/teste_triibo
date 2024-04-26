const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("DELETE /user/:id", () => {
  let userId;
  let token;

  beforeAll(async () => {
    const user = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@delete.com",
      password: "123456",
    });

    userId = user.body.id;

    const response = await request(app)
      .post("/user/login")
      .send({ email: "walter@delete.com", password: "123456" });

    token = response.body.token;
  });

  it("should return error message for non-existing user", async () => {
    const response = await request(app)
      .delete("/user/999999")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("should return error message for invalid ID format", async () => {
    const response = await request(app)
      .delete("/user/string")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid ID format");
  });

  it("should delete user by ID", async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});
