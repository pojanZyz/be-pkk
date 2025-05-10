import { Cart, CartItem, Product } from '../models/index.js';

// Get all items in the cart for a specific user
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const cartItems = await CartItem.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'image'],
        },
        {
          model: Cart,
          where: { UserId: userId },
        },
      ],
    });
    res.status(200).json({ message: 'Cart items retrieved successfully', data: cartItems });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve cart items', error: error.message });
  }
};

// Add an item to the cart for a specific user
const addItemToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const { productId, quantity } = req.body;

    // Validate if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create a cart for the user
    const [cart] = await Cart.findOrCreate({
      where: { UserId: userId },
    });

    // Add item to the cart
    const cartItem = await CartItem.create({
      CartId: cart.id,
      ProductId: productId,
      quantity,
    });

    res.status(201).json({ message: 'Item added to cart successfully', data: cartItem });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add item to cart', error: error.message });
  }
};

// Update the quantity of an item in the cart for a specific user
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const { quantity } = req.body;

    // Find the cart item that belongs to the user's cart
    const cartItem = await CartItem.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Cart,
          where: { UserId: userId },
        },
      ],
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Update the quantity of the cart item
    await cartItem.update({ quantity });
    res.status(200).json({ message: 'Cart item updated successfully', data: cartItem });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update cart item', error: error.message });
  }
};

// Remove an item from the cart for a specific user
const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const cartItem = await CartItem.findOne({
      where: { id: req.params.id },
      include: [{ model: Cart, where: { UserId: userId } }],
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove cart item', error: error.message });
  }
};

export default { getCartItems, addItemToCart, updateCartItem, removeCartItem };