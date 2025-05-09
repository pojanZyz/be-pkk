import { Cart, CartItem, Product } from '../models/index.js';

// Create a new cart
const createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const newCart = await Cart.create({ userId });
    res.status(201).json({ message: 'Cart created successfully', cart: newCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cart by user ID
const getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.params.userId },
      include: [{ model: CartItem, include: [Product] }],
    });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add item to cart
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    const existingItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartItem.create({ cartId: cart.id, productId, quantity });
    }

    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update cart item quantity
const updateCartItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(req.params.itemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.update({ quantity });
    res.status(200).json({ message: 'Cart item quantity updated successfully', cartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.itemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear all items in cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.params.userId } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    await CartItem.destroy({ where: { cartId: cart.id } });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createCart,
  getCartByUserId,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
};
