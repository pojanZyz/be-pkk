import { Product, Category } from '../models/index.js';
import { db } from '../config/database.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Helper function to upload image to Supabase
const uploadImageToSupabase = async (file) => {
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(`products/${Date.now()}_${file.originalname}`, file.path, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  return `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${data.path}`;
};

// Helper function to delete image from Supabase
const deleteImageFromSupabase = async (imageUrl) => {
  const imagePath = imageUrl.split('/uploads/')[1];
  await supabase.storage.from('uploads').remove([`products/${imagePath}`]);
};
 
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['id', 'name'] }],
    });

    if (products.length === 0) {
      return res.status(200).json({ message: 'Get all products success, no product found', data: [] });
    }

    res.status(200).json({ message: 'Products retrieved successfully', data: products });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'name'] }],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product retrieved successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product', error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, categoryId } = req.body;

    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    let imageUrl = null;

    if (req.file) {
      const timestampedFileName = `${Date.now()}_${req.file.originalname}`;

      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(`products/${timestampedFileName}`, req.file.buffer, {
          contentType: req.file.mimetype,
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/products/${encodeURIComponent(timestampedFileName)}`;
    }

    const product = await Product.create({
      name,
      price,
      description,
      stock,
      image: imageUrl,
      CategoryId: categoryId,
    });

    res.status(201).json({ message: 'Product created successfully', data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock, categoryId } = req.body;

    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Update product failed, product not found' });
    }

    let imageUrl = product.imageUrl;

    if (req.file) {
      if (product.imageUrl) {
        const imagePath = product.imageUrl.split('/uploads/')[1];
        await supabase.storage.from('uploads').remove([`products/${imagePath}`]);
      }

      const timestampedFileName = `${Date.now()}_${req.file.originalname}`;
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(`products/${timestampedFileName}`, req.file.buffer, {
          contentType: req.file.mimetype,
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/products/${encodeURIComponent(timestampedFileName)}`;
    }

    await product.update({
      name,
      price,
      description,
      stock,
      imageUrl,
      CategoryId: categoryId,
    });

    res.status(200).json({ message: 'Product updated successfully', data: product });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Delete product failed, product not found' });
    }

    if (product.imageUrl) {
      await deleteImageFromSupabase(product.imageUrl);
    }

    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};