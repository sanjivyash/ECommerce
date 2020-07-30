const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const Product = require("../models/products");
const upload = require("../middleware/upload");

const router = express.Router();

// get all products
router.get("/products", async (req, res) => {
  const products = await Product.find({}).sort("-price");
  return res.send(products);
});

// create a product
router.post("/products", auth, async (req, res) => {
  try {
    const product = new Product(req.body);
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
  upload("images"),
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ height: 500, width: 500 })
        .png()
        .toBuffer();
      const product = await Product.findById(productId);
      product.images.push(buffer);
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
