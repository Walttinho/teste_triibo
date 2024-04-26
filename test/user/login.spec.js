const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");
const bcrypt = require("bcrypt");

describe("POST /user/login", () => {
  let userIdOne;

  beforeAll(async () => {
    const password = "123456";
    const [{ id: id1 }] = await knex("users").insert(
      {
        name: "Walter Netto",
        email: "walter@teste.com",
        password: await bcrypt.hash(password, 10),
      },
      ["id"]
    );

    userIdOne = id1;
  });

  afterAll(async () => {
    //await knex("users").whereIn("email", ["walter@teste.com"]).del();
  });

  it("should login user", async () => {
    const response = await request(app).post("/user/login").send({
      email: "walter@teste.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.name).toBe("Walter Netto");
    expect(response.body.user.email).toBe("walter@teste.com");
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toBeTruthy();
  });

  it("should not login user with wrong password", async () => {
    const response = await request(app).post("/user/login").send({
      email: "walter@teste.com",
      password: "errado",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("user or password is incorrect");
  });

  it("should not login user with wrong email", async () => {
    const response = await request(app).post("/user/login").send({
      email: "errado@teste.com",
      password: "123456",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("user or password is incorrect");
  });
});
