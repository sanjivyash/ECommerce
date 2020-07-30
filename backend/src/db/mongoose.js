const mongoose = require("mongoose");
require('dotenv').config();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection established!"))
  .catch(() => console.log("Database connection dumped..."));
