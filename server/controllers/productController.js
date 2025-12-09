import Product from "../models/productModel.js";

import cloudinary from "../config/cloudinary.js";

// Get all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ deleted: 0 }).sort({ createdAt: -1 });
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get one product by ID
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id, deleted: 0 });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Create/register product
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, sizes, addons, status, category } =
      req.body;

    if (!name || !description || !price || !sizes || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }
    //image upload
    let result;

    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
    }
    // save data
    const product = await Product.create({
      name,
      description,
      price,
      image: result?.url || null,
      sizes,
      addons,
      status,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Product registered successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update product by ID
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Soft delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { deleted: 1 },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product soft deleted successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
