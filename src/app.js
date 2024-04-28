const express = require("express");
const router = require("./router/indexRouter");
require("dotenv").config();
require("./database/connection");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use(router);

module.exports = app;
