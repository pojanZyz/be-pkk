import { Order, OrderItem, Product, User } from "../models/index.js";

export default {
  async createOrder(req, res) {
    try {
      const { userId, items, totalPrice } = req.body;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: userId not found" });
      }
      // Create the order dengan userId
      const order = await Order.create({ UserId : userId, totalPrice, status: "pending" });

      // Create order items
      const orderItems = await Promise.all(
        items.map(async (item) => {
          const product = await Product.findByPk(item.productId);
          if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
          }
          return OrderItem.create({
            OrderId: order.id,
            ProductId: item.productId,
            quantity: item.quantity,
            price: product.price * item.quantity,
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
