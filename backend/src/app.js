const path = require("path");
const cors = require('cors');

const express = require("express");
require("./db/mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));

const TEMPLATES_DIR = path.join(__dirname, "..", "templates");
const STATIC_DIR = path.join(__dirname, "..", "static");

app.use(cors());
app.use(express.static(STATIC_DIR));
app.use(require("./routers/products"));

app.get("/", (req, res) => {
  res.sendFile(path.join(TEMPLATES_DIR, "submit.html"));
});

module.exports = app;
