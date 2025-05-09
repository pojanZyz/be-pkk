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
router.get('/me', loginValidation, userController.me);

router.post('/user', loginValidation, adminValidation, userController.createUser);
router.get('/user', loginValidation, adminValidation, userController.getAllUsers);
router.get('/user/:id', loginValidation, adminValidation, userController.getUserById);
router.put('/user/:id', loginValidation, adminValidation, userController.updateUser);
router.delete('/user/:id', loginValidation, adminValidation, userController.deleteUser);

// Product routes
router.post('/product', loginValidation, adminValidation, upload.single('image'), productController.createProduct);
router.get('/product', productController.getAllProducts);
router.get('/product/:id', loginValidation, productController.getProductById);
router.put('/product/:id', loginValidation, adminValidation, upload.single('image'), productController.updateProduct);
router.delete('/product/:id', loginValidation, adminValidation, productController.deleteProduct);

// category routes
router.post('/category', loginValidation, adminValidation, categoryController.createCategory);
router.get('/category', categoryController.getAllCategories);
router.get('/category/:id', loginValidation, categoryController.getCategoryById);
router.put('/category/:id', loginValidation, adminValidation, categoryController.updateCategory);
router.delete('/category/:id', loginValidation, adminValidation, categoryController.deleteCategory);    

export default router;