import express from 'express'
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from '../controllers/productController';

const router = express.Router();

// product routes

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/', createProduct)

router.patch('/:id', updateProduct)

export default router;