import express from "express";
const router = express.Router();
import adminValidation from "../middleware/adminValidation.js";
import loginValidation from "../middleware/loginValidation.js";
import userController from "../controllers/userController.js";
import productController from "../controllers/productController.js";
import categoryController from "../controllers/categoryController.js";
import orderController from "../controllers/orderController.js";
import cartController from "../controllers/cartController.js";
import { getHistoryByUser } from "../controllers/historyController.js";
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
router.put("/order/:id/status", adminValidation, orderController.updateOrderStatus);
router.delete("/order/:id", adminValidation, orderController.deleteOrder);
router.get("/order/user/:userId", loginValidation, orderController.getOrdersByUser);

// cart routes
router.get("/cart", loginValidation, cartController.getCartItems);
router.post("/cart", loginValidation, cartController.addItemToCart);
router.put("/cart/:id", loginValidation, cartController.updateCartItem);
router.delete("/cart/:id", loginValidation, cartController.deleteCartItem);

// History routes
router.get("/history/:userId", loginValidation, getHistoryByUser);
export default router;
