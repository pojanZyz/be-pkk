import { CartItem, Product } from '../models/index.js';

// Create a new cart item
const createCartItem = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const newCartItem = await CartItem.create({ cartId, productId, quantity });
    res.status(201).json({ message: 'Cart item created successfully', cartItem: newCartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cart items
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({ include: [Product] });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cart item by ID
const getCartItemById = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id, { include: [Product] });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update cart item
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.update({ quantity });
    res.status(200).json({ message: 'Cart item updated successfully', cartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete cart item
const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};
