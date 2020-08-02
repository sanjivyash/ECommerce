const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fileUpload = require('express-fileupload');
const _ = require('lodash');

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

// read a product
router.get("/products/:productId", async (req, res) => {
  // console.log(productId);
  try {
    const product = await Product.findByProductId(req.params.productId);
    return res.send({ product });
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
  fileUpload({ createParentPath: true }),
  async (req,res) => {
    try {
      if(!req.files) {
        res.send({
          status: false,
          message: 'No file uploaded'
        });
      } else {
        let data = [];
        req.files.photos.forEach((file) => {
          let photo = file;
          photo.mv('../uploads/' + photo.name);
          data.push({
            name: photo.name,
            mimetype: photo.mimetype,
            size: photo.size
          });
        });
        res.send({
          status: true,
          message: 'Files are uploaded',
          data: data
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// edit a product
router.patch("/products/:productId", auth, async (req, res) => {
  try {
    const product = await Product.findByProductId(req.params.productId);
    const updates = Object.keys(req.form);
    const fields = ["name", "description", "price"];
    const isValid = updates.every((update) => fields.includes(update));

    if (isValid) {
      updates.forEach((update) => (product[update] = req.form[update]));
      await product.save();
      res.send(product);
    } else {
      throw new Error("Invalid attributes targeted");
    }
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

// delete a product
router.delete("/products/:productId", auth, async (req, res) => {
  try {
    const product = await Product.findByProductId(req.params.productId);
    await product.remove();
    res.send({ product });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

module.exports = router;
