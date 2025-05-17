import {db} from '../config/database.js';

// Import semua model sebagai fungsi
import defineUser from './users.js';
import defineProduct from './product.js';
import defineOrder from './order.js';
import defineOrderItem from './orderItem.js';
import defineCategory from './category.js';
import defineCart from './cart.js';
import defineCartItem from './cartItem.js';

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


export {
  db,
  User,
  Product,
  Order,
  OrderItem,
  Category,
  Cart,
  CartItem,
};
