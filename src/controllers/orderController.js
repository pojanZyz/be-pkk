import Order from "../models/order.js";
import OrderItem from "../models/orderItem.js";
import Product from "../models/product.js";

export default {
  async createOrder(req, res) {
    try {
      const { items, totalPrice } = req.body;

      // Create the order
      const order = await Order.create({ totalPrice });

      // Create order items
      const orderItems = await Promise.all(
        items.map(async (item) => {
          const product = await Product.findByPk(item.productId);
          if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
          }
          return OrderItem.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: totalPrice,
          });
        })
      );

      res.status(201).json({ order, orderItems });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [{ model: OrderItem, include: [Product] }],
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [{ model: OrderItem, include: [Product] }],
      });
      res.json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.status = status;
      await order.save();

      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      await order.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOrdersByUser(req, res) {
    try {
      const { userId } = req.params;

      const orders = await Order.findAll({
        where: { userId },
        include: [{ model: OrderItem, include: [Product] }],
      });

      res.json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
