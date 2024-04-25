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
   const existTable = await knex.schema.hasTable("users");

   if (!existTable) {
     await knex.schema.createTable("users", (table) => {
       table.increments("id").primary();
       table.string("name", 255);
       table.string("email",255 );
       table.string("password",255);       
     });
     console.log("Table users created successfully");
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




module.exports = knex