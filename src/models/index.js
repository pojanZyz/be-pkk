import Sequelize from 'sequelize';
import sequelize from '../config/database.js';
import {db} from '../config/database.js';

// Import semua model sebagai fungsi
import defineUser from './users.js';
import defineProduct from './product.js';
import defineOrder from './order.js';
import defineOrderItem from './orderItem.js';
import defineCategory from './category.js';
import defineCart from './cart.js';
import defineCartItem from './cartItem.js';
import Order from './order.js';
import OrderItem from './orderItem.js';
import Product from './product.js';
import User from './user.js'; // pastikan ada file user.js

const OrderModel = Order(sequelize);
const OrderItemModel = OrderItem(sequelize);
const ProductModel = Product(sequelize);
const UserModel = User(sequelize);

// inisialisasi model
const User = defineUser(db);
const Product = defineProduct(db);
const Order = defineOrder(db);
const OrderItem = defineOrderItem(db);
const Category = defineCategory(db);
const Cart = defineCart(db);
const CartItem = defineCartItem(db);

// Relasi antar model
User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Relasi Cart dan User
User.hasOne(Cart);
Cart.belongsTo(User);

// Cart berisi banyak item
Cart.hasMany(CartItem, { onDelete: 'CASCADE' });
CartItem.belongsTo(Cart);

// Setiap item di cart adalah product
Product.hasMany(CartItem);
CartItem.belongsTo(Product);

// Relasi
UserModel.hasMany(OrderModel, { foreignKey: 'userId' });
OrderModel.belongsTo(UserModel, { foreignKey: 'userId' });

OrderModel.hasMany(OrderItemModel, { foreignKey: 'orderId' });
OrderItemModel.belongsTo(OrderModel, { foreignKey: 'orderId' });

ProductModel.hasMany(OrderItemModel, { foreignKey: 'productId' });
OrderItemModel.belongsTo(ProductModel, { foreignKey: 'productId' });

export {
  sequelize,
  Sequelize,
  OrderModel as Order,
  OrderItemModel as OrderItem,
  ProductModel as Product,
  UserModel as User,
  db,
  User,
  Product,
  Order,
  OrderItem,
  Category,
  Cart,
  CartItem,
};
