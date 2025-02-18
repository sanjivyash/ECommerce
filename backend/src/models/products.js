const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const validator = require("validator");

// model scheme
const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    default: "No description provided",
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
  },
  thumbnail: {
    type: String,
  }
});

// enable pagination
ProductSchema.plugin(paginate);

// find by Product ID
ProductSchema.statics.findByProductId = async function (productId) {
  const product = await Product.findOne({ productId });

  if (product) {
    return product;
  } else {
    console.log(`ProductId: ${productId}`);
    throw new Error("Invalid ProductId");
  }
};

// logging only the required fields
ProductSchema.methods.toJSON = function () {
  const product = this.toObject();
  return product;
};

// actual model
const Product = new mongoose.model("Product", ProductSchema);
module.exports = Product;
