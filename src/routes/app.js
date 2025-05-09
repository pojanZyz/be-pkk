import express from 'express';
const router = express.Router();
import adminValidation from '../middleware/adminValidation.js';
import loginValidation from '../middleware/loginValidation.js';
import userController from '../controllers/userController.js';
import productController from '../controllers/productController.js';
import categoryController from '../controllers/categoryController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage}); // Temporary storage for uploaded files

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get("/me", userController.me);

router.post("/user", userController.createUser);
router.get("/user", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

// Product routes
router.post(
  "/product",
  upload.single("image"),
  productController.createProduct
);
router.get("/product", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.put(
  "/product/:id",
  upload.single("image"),
  productController.updateProduct
);
router.delete("/product/:id", productController.deleteProduct);

// category routes
router.post("/category", categoryController.createCategory);
router.get("/category", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);    

export default router;