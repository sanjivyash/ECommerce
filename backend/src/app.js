const express = require("express");
require("./db/mongoose");

const app = express();

app.use(express.json());
app.use(require("./routers/products"));

module.exports = app;
