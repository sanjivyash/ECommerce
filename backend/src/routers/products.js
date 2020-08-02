const path = require("path");

const mongoose = require("mongoose");
const express = require("express");
const fileUpload = require("express-fileupload");

const Product = require("../models/products");
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
router.get("/products/item", async (req, res) => {
  try {
    const product = await Product.findByProductId(req.form.productId);
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
  async (req, res) => {
    try {
      if (!req.files) {
        throw new Error("No files uploaded");
      } else {
        let data = [];
        req.files.photos = [].concat(req.files.photos);

        const product = await Product.findByProductId(req.params.productId);
        const routes = [];

        const isValid = req.files.photos.every(
          (photo) =>
            ["png", "jpeg", "jpg"].indexOf(path.extname(photo.name)) !== -1
        );

        if (!isValid) {
          throw new Error("Invalid file type uploaded");
        }

        req.files.photos.forEach(async (photo) => {
          let route = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "uploads",
            photo.name
          );

          routes.push(route);
          await photo.mv(route);

          data.push({
            name: photo.name,
            mimetype: photo.mimetype,
            size: photo.size,
          });
        });

        product.images = product.images.concat(routes);
        await product.save();

        res.send({ data });
      }
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
);

// edit a product
router.patch("/products/item", auth, async (req, res) => {
  try {
    const product = await Product.findByProductId(req.form.productId);
    delete req.form.productId;

    const updates = Object.keys(req.form);
    const fields = ["name", "description", "price", "images"];
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
router.delete("/products/item", auth, async (req, res) => {
  try {
    const product = await Product.findByProductId(req.form.productId);
    await product.remove();
    res.send({ product });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

module.exports = router;
