const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("PUT /user/:id", () => {
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

  afterAll(async () => {
    await knex("users").whereIn("email", ["renata.update@example.com"]).del();
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

  it("should update only the email", async () => {
    const updatedUserData = {
      email: "renata.update@example.com",
    };

    const response = await request(app)
      .put(`/user/${userIdOne}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(updatedUserData.email);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
  });

  it("should update only the password", async () => {
    const updatedUserData = {
      password: "654321",
    };

    const response = await request(app)
      .put(`/user/${userIdOne}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
  });

  it("should update only the name", async () => {
    const updatedUserData = {
      name: "Renata Medeiros Update",
    };

    const response = await request(app)
      .put(`/user/${userIdOne}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUserData.name);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
  });

  it("should return  error message for empty request body", async () => {
    const response = await request(app).put(`/user/${userIdOne}`).send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Request body cannot be empty");
  });

  it("should return error message for non-existing user", async () => {
    const response = await request(app).put("/user/999999").send({
      name: "Renata Medeiros",
      email: "renata@example.com",
      password: "654321",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("should return error message for invalid ID format", async () => {
    const response = await request(app).put("/user/string").send({
      name: "Renata Medeiros",
      email: "renata@example.com",
      password: "654321",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid ID format");
  });

  it("should return error message for invalid email", async () => {
    const response = await request(app).put(`/user/${userIdOne}`).send({
      name: "Renata Medeiros",
      email: "invalid-email",
      password: "654321",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });
});
