import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.models.js';

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts)
router.put('/:id', updateProduct);     
router.delete('/:id', deleteProduct);

export default router;