import { OrderItem } from '../models/index.js';

// Create a new order item
const createOrderItem = async (req, res) => {
  try {
    const { quantity, price, orderId, productId } = req.body;
    const newOrderItem = await OrderItem.create({ quantity, price, orderId, productId });
    res.status(201).json({ message: 'Order item created successfully', orderItem: newOrderItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all order items
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order item by ID
const getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order item
const updateOrderItem = async (req, res) => {
  try {
    const { quantity, price } = req.body;
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    await orderItem.update({ quantity, price });
    res.status(200).json({ message: 'Order item updated successfully', orderItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete order item
const deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    await orderItem.destroy();
    res.status(200).json({ message: 'Order item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
