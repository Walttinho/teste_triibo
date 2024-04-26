const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("DELETE /user/:id", () => {
  let userIdOne;

  beforeAll(async () => {
    const [{ id: id1 }] = await knex("users").insert(
      {
        name: "Walter Netto",
        email: "walter@example.com",
        password: "123456",
      },
      ["id"]
    );

    userIdOne = id1;   
  });

  it("should delete user by ID", async () => {
    const response = await request(app).delete(`/user/${userIdOne}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should return error message for non-existing user", async () => {
    const response = await request(app).delete("/user/999999");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("should return error message for invalid ID format", async () => {
    const response = await request(app).delete("/user/string");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid ID format");
  });
});
