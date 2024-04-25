const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("POST /user", () => { 

  beforeAll(async () => {
  
    await knex("users").where({ email: "walter@example.com" }).del();

  });

  afterAll(async () => {
    await knex("users").where({ email: "walter@example.com" }).del();
    
  });

 

  it("should create a new user", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@example.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Walter Netto");
    expect(response.body.email).toBe("walter@example.com");
    expect(response.body).not.toHaveProperty("password");
  });

  it("should not create a new user without the name", async () => {
    const response = await request(app).post("/user").send({
      email: "walter@example.com",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Name is required");
  });

  it("should not create a new user without the email", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email is required");
  });

  it("should not create a new user without the password", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Password is required");
  });

  it("should not create a new user with an invalid email", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "invalid-email",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });

  it("should not create a new user this email already exists", async () => {
    const response = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@example.com",
      password: "123456",
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });
});
