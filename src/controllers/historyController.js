import { Order, OrderItem, Product } from '../models/index.js';

const getHistoryByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.findAll({
      where: { UserId : userId },
      include: [{
        model: OrderItem,
        include: [Product],
      }],
      order: [['createdAt', 'DESC']],
    });

    const history = orders.map(order => ({
      orderId: order.id,
      orderDate: order.createdAt,
      items: order.OrderItems.map(item => ({
        productName: item.Product.name,
        quantity: item.quantity,
        totalPrice: item.total_price,
      })),
    }));

    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getHistoryByUser };