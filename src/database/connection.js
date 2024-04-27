require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
  },
});

const createTableIfDoesNotExist = async () => {
  const existTableUsers = await knex.schema.hasTable("users");

  if (!existTableUsers) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 255).notNullable();
    });
    console.log("Table users created successfully");
  }

  const existTableAddresses = await knex.schema.hasTable("addresses");

  if (!existTableAddresses) {
    await knex.schema.createTable("addresses", (table) => {
      
    table.increments('id').primary();
    table.string('street').notNullable();
    table.string('district').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('cep').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
 
    });
    console.log("Table addresses created successfully");
  }

};

(async () => {
  try {
    await knex.raw("SELECT 1");
    await createTableIfDoesNotExist();
    console.log(`Connected to database ${process.env.DB_NAME}`);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();

module.exports = knex;
