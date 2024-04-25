const request = require("supertest");
const app = require("../../src/app");
const knex = require("../../src/database/connection");

describe("GET /user", () => {
    beforeAll(async () => {
      await knex("users").insert([
        {
          name: "Walter Netto",
          email: "walter@example.com",
          password: "123456",
        },
        {
          name: "Renata Medeiros",
          email: "renata@example.com",
          password: "654321",
        },
      ]);
    });

    afterAll(async () => {      
      await knex("users")
        .whereIn("email", ["walter@example.com", "renata@example.com"])
        .del();
    });

    it("should find all users", async () => {
      const response = await request(app).get("/user");
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(2);
    }); 

})