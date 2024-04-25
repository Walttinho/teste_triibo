const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("PUT /user/:id", () => {
  let userIdOne;

  beforeAll(async () => {
    const [{id: id1}] = await knex("users").insert(
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

  it("should update user by ID", async () => {
    const updatedUserData = {
      name: "Renata Medeiros",
      email: "renata@example.com",
      password: "654321",
    };

    const response = await request(app)
      .put(`/user/${userIdOne}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUserData.name);
    expect(response.body.email).toBe(updatedUserData.email);
    expect(response.body.id).toBe(userIdOne);
  });

  it("should return  error message for empty request body", async () => {
    const response = await request(app).put(`/user/${userIdOne}`).send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Request body cannot be empty");
  });

  it("should return error message for non-existing user", async () => {
    const response = await request(app).put("/user/999999").send({
      name: "Renata Medeiros",
      email: "renata@example.com",
      password: "654321",
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User not found");
  });

  it("should return error message for invalid ID format", async () => {
    const response = await request(app).put("/user/string").send({
      name: "Renata Medeiros",
      email: "renata@example.com",
      password: "654321",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid ID format");
  });
});
