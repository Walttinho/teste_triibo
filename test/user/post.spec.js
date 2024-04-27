const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("POST /user", () => {
  beforeAll(async () => {
    await knex("users").where({ email: "walter@create.com" }).del();
  });

  afterAll(async () => {
    await knex("users")
      .whereIn("email", ["walter@create.com", "walter2@create.com"])
      .del();

  });

  it("should create a new user", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@create.com",
      password: "123456",
      cep: "01001000",
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Walter Netto");
    expect(response.body.email).toBe("walter@create.com");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.address).toHaveProperty("cep");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
  });

  it("should not create a new user without the name", async () => {
    const response = await request(app).post("/user").send({
      email: "walter@create.com",
      password: "123456",
      cep: "01001000",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Name is required");
  });

  it("should not create a new user without the email", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      password: "123456",
      cep: "01001000",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email is required");
  });

  it("should not create a new user without the password", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@create.com",
      cep: "01001000",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Password is required");
  });

  it("should not create a new user with an invalid email", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "invalid-email",
      password: "123456",
      cep: "01001000",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });

  it("should not create a new user this email already exists", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@create.com",
      password: "123456",
      cep: "01001000",
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });

  it("should not create a new user without the CEP", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@create.com",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("CEP is required");
  });

  it("should not create a new user with invalid CEP format", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@create.com",
      password: "123456",
      cep: "95010A10",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid CEP format");
  });

  it("should not create a new user with non-existent CEP", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter2@create.com",
      password: "123456",
      cep: "99999999",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("CEP not found");
  });
});
