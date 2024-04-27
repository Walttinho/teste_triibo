const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("PUT /user/:id", () => {
  let userId;
  let token;

  beforeAll(async () => {
    const user = await request(app).post("/user").send({
      name: "Walter Netto",
      email: "walter@update.com",
      password: "123456",
      cep: "03089000",
    });

    userId = user.body.id;

    const response = await request(app)
      .post("/user/login")
      .send({ email: "walter@update.com", password: "123456" });

    token = response.body.token;
  });

  afterAll(async () => {
    await knex("users")
      .whereIn("email", ["renata.update@update.com", "renata@update.com"])
      .del();
  });

  it("should update user by ID", async () => {
    const updatedUserData = {
      name: "Renata Medeiros",
      email: "renata@update.com",
      password: "654321",
      cep: "03089000",
    };

    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUserData.name);
    expect(response.body.email).toBe(updatedUserData.email);
    expect(response.body.id).toBe(userId);
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("cep");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
  });

  it("should update only the email", async () => {
    const updatedUserData = {
      email: "renata.update@update.com",
    };

    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(updatedUserData.email);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(userId);
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("cep");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
  });

  it("should update only the password", async () => {
    const updatedUserData = {
      password: "654321",
    };

    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(userId);
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("cep");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
  });

  it("should update only the name", async () => {
    const updatedUserData = {
      name: "Renata Medeiros Update",
    };

    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUserData.name);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(userId);
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("cep");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
  });

  it("should update only the cep", async () => {
    const updatedUserData = {
      name: "Renata Medeiros Update",
    };

    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(userId);
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("cep");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
  });

  it("should return  error message for empty request body", async () => {
    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Request body cannot be empty");
  });

  it("should return error message for non-existing user", async () => {
    const response = await request(app)
      .put("/user/999999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Renata Medeiros",
        email: "renata@update.com",
        password: "654321",
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("should return error message for invalid ID format", async () => {
    const response = await request(app)
      .put("/user/string")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Renata Medeiros",
        email: "renata@update.com",
        password: "654321",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid ID format");
  });

  it("should return error message for invalid email", async () => {
    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Renata Medeiros",
        email: "invalid-email",
        password: "654321",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });

  it("should not update a user with invalid CEP format", async () => {
    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Renata Medeiros",
        email: "renata@update.com",
        password: "654321",
        cep: "95010A10",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid CEP format");
  });

  it("should not update a user with non-existent CEP", async () => {
    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Renata Medeiros",
        email: "renata@update.com",
        password: "654321",
        cep: "99999999",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("CEP not found");
  });
});
