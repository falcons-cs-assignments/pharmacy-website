import express from 'express';
import {
    create_product,
    get_all_products,
    get_product_by_id,
    update_product,
    delete_product
} from '../controllers/productControllers.js';
import { authToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new product
router.post('/api/products', authToken, isAdmin, create_product);

// Get all products
router.get('/api/products', authToken, get_all_products);

// Get a single product by ID
router.get('/api/products/:id', authToken, get_product_by_id);

// Update a product
router.put('/api/products/:id', authToken, isAdmin, update_product);

// Delete a product
router.delete('/api/products/:id', authToken, isAdmin, delete_product);

export { router };
