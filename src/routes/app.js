import express from "express";
const router = express.Router();
import adminValidation from "../middleware/adminValidation.js";
import loginValidation from "../middleware/loginValidation.js";
import userController from "../controllers/userController.js";
import productController from "../controllers/productController.js";
import categoryController from "../controllers/categoryController.js";
import orderController from "../controllers/orderController.js";
import orderItemsController from "../controllers/orderItemsController.js";
import cartController from "../controllers/cartController.js";
import cartItemsController from "../controllers/cartItemsController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage }); // Temporary storage for uploaded files

// User routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", loginValidation, userController.me);

router.post("/user", adminValidation, userController.createUser);
router.get("/user", adminValidation, userController.getAllUsers);
router.get("/user/:id", adminValidation, userController.getUserById);
router.put("/user/:id", adminValidation, userController.updateUser);
router.delete("/user/:id", adminValidation, userController.deleteUser);

// Product routes
router.post(
  "/product",
  adminValidation,
  upload.single("image"),
  productController.createProduct
);
router.get("/product", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.put(
  "/product/:id",
  adminValidation,
  upload.single("image"),
  productController.updateProduct
);
router.delete("/product/:id", adminValidation, productController.deleteProduct);

// Category routes
router.post("/category", adminValidation, categoryController.createCategory);
router.get("/category", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.put("/category/:id", adminValidation, categoryController.updateCategory);
router.delete(
  "/category/:id",
  adminValidation,
  categoryController.deleteCategory
);

// Order routes
router.post("/order", loginValidation, orderController.createOrder);
router.get("/order", adminValidation, orderController.getAllOrders);
router.get("/order/:id", loginValidation, orderController.getOrderById);
router.put("/order/:id", adminValidation, orderController.updateOrderStatus);
router.delete("/order/:id", adminValidation, orderController.deleteOrder);

// Order Items routes
router.post(
  "/order-item",
  adminValidation,
  orderItemsController.createOrderItem
);
router.get(
  "/order-item",
  adminValidation,
  orderItemsController.getAllOrderItems
);
router.get(
  "/order-item/:id",
  adminValidation,
  orderItemsController.getOrderItemById
);
router.put(
  "/order-item/:id",
  adminValidation,
  orderItemsController.updateOrderItem
);
router.delete(
  "/order-item/:id",
  adminValidation,
  orderItemsController.deleteOrderItem
);

// Cart routes
router.post("/cart", loginValidation, cartController.createCart);
router.get("/cart/:userId", loginValidation, cartController.getCartByUserId);
router.post("/cart/item", loginValidation, cartController.addItemToCart);
router.put(
  "/cart/item/:itemId",
  loginValidation,
  cartController.updateCartItemQuantity
);
router.delete(
  "/cart/item/:itemId",
  loginValidation,
  cartController.removeItemFromCart
);
router.delete("/cart/:userId", loginValidation, cartController.clearCart);

// Cart Items routes
router.post("/cart-item", loginValidation, cartItemsController.createCartItem);
router.get("/cart-item", loginValidation, cartItemsController.getAllCartItems);
router.get(
  "/cart-item/:id",
  loginValidation,
  cartItemsController.getCartItemById
);
router.put(
  "/cart-item/:id",
  loginValidation,
  cartItemsController.updateCartItem
);
router.delete(
  "/cart-item/:id",
  loginValidation,
  cartItemsController.deleteCartItem
);

export default router;
