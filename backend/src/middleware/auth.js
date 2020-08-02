const mongoose = require("mongoose");

const auth = async (req, res, next) => {
  try {
    const form = req.body;
    if (form.token === process.env.SECRET_TOKEN ) {
      delete form.token;
      req.form = form;
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = auth;
