const path = require("path");
const AWS = require('aws-sdk');
const mongoose = require("mongoose");
const express = require("express");
const fileUpload = require("express-fileupload");
const sharp = require('sharp');

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
    res.status(400).send({ error: e.message });
  }
});

// read a product
router.get("/product", async (req, res) => {
  try {
    const product = await Product.findByProductId(req.query.productId);
    return res.send({ product });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// create a product
router.post("/product", auth, async (req, res) => {
  try {
    const product = new Product(req.form);
    await product.save();
    return res.status(201).send({ product });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// images for a product

const ID = process.env.ID;
const SECRET = process.env.SECRET;

const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});

router.post(
  "/products/:productId",
  fileUpload({ createParentPath: true }),
  async (req, res) => {
    try {
      if (!req.files) {
        throw new Error("No files uploaded");
      } else {
        let response = [];
        req.files.photos = [].concat(req.files.photos);

        const product = await Product.findByProductId(req.params.productId);
        const routes = [];
        let thumbnailString = '';

        const photos = req.files.photos;
        uploadImagesAtOnce = photos.map(async (photo, index) => {
          let params = {
            Bucket: BUCKET_NAME,
            Key: product.productId + `${index}${Date.now()}`,
            Body: photo.data,
            ContentType: photo.mimetype,
            ContentLength: photo.size,
          };    
          try{
            const data = await s3.upload(params).promise();
            console.log(`File Uploaded Successfully: ${data.Location}`);
            routes.push(product.productId + `${index}${Date.now()}`);
            if(index==0){
              try{
                const buf = Buffer.from(photo.data);
                const base = await sharp(buf).jpeg().resize(400,700).toBuffer();                
                const base64 = base.toString('base64');
                thumbnailString = base64;
              } catch(err){
                console.log(err);
              }
            }
            response.push({
              name: photo.name,
              mimetype: photo.mimetype,
              size: photo.size,
              location: data.Location,
            });
          } catch (err){
            console.log(err, err.stack);
          }
        });

        await Promise.all(uploadImagesAtOnce);

        console.log(routes);
        product.images = product.images.concat(routes);
        product.thumbnail = thumbnailString;
        try{
          await product.save();
        } catch(err){
          console.log(err, err.stack);
        }
        console.log("Files Uploaded");
        res.send({ response });
      }
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
);

// edit a product
router.post("/product/edit", auth, async (req, res) => {
  try {
    const product = await Product.findByProductId(req.form.productId);
    delete req.form.productId;

    const updates = Object.keys(req.form);
    const fields = ["name", "description", "price", "quantity", "images"];
    const isValid = updates.every((update) => fields.includes(update));

    if (isValid) {
      updates.forEach((update) => {
        if (req.form[update] !== "") {
          product[update] = req.form[update];
        }
      });
      await product.save();
      res.send(product);
    } else {
      throw new Error("Invalid attributes targeted");
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// delete a product
router.post("/product/delete", auth, async (req, res) => {
  try {
    const product = await Product.findByProductId(req.form.productId);
    res.send({ product });

    const picture_paths = product.images;
    removeImagesAtOnce = picture_paths.map(async (photoPath, index) => {
      let params = {
        Bucket: BUCKET_NAME,
        Key: photoPath,
      };    
      try{
        console.log(`File Deleted Successfully: ${photoPath}`);
        const data = await s3.deleteObject(params).promise();
      } catch (err){
        console.log(err, err.stack);
      }
    });

    await Promise.all(removeImagesAtOnce);

    await product.remove();
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
