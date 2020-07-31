const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const Product = require("../models/products");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

const router = express.Router();

// get all products
router.get("/products", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const products = await Product.paginate(
      {},
      { page: Number(page), limit: Number(limit) }
    );
    return res.send({ products });
  } catch (e) {
    res.status(400).send(e);
  }
});

// create a product
router.post("/products", auth, async (req, res) => {
  try {
    const product = new Product(req.form);
    await product.save();
    return res.status(201).send({ product });
  } catch (e) {
    res.status(400).send(e);
  }
});

// images for a product
router.post(
  "/products/:productId",
  auth,
  upload.array("images"),
  async (req, res) => {
    try {
      const buffer = [];

      req.files.forEach(async (file) =>
        buffer.push(
          await sharp(file.buffer)
            .resize({ height: 500, width: 500 })
            .png()
            .toBuffer()
        )
      );
      const product = await Product.findById(productId);
      product.images = buffer;
      await product.save();
      res.send({ product });
    } catch (e) {
      res.status(500).send();
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
