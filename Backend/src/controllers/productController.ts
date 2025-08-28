import mongoose from "mongoose"
import Product from "../models/Product"
import { Request, Response } from 'express'
import { IProduct, ProductCreateInput, ProductUpdateInput } from "../types/Product"
import { rmSync } from "fs"


// getallproducts

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error })
    }
}


// get product by id

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid product ID format' });
            return
        }

        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};


//create product

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData: ProductCreateInput = req.body
        const product = new Product(productData)
        const savedProduct = await product.save()

        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(500).json({ message: 'Error creating product ', error })
    }
}


//update product 

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid product ID format' });
            return
        }

        const updateData: ProductUpdateInput = req.body
        const product = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true })

        if (!product) {
            res.status(404).json({ message: 'Product not found' })
            return
        }

        res.status(200).json({ message: 'Product updated successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Error updating Product', error })
    }
}

//delete product

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid product ID format' });
            return
        }

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            res.status(404).json({ message: 'Product not found' })
            return
        }

        res.status(200).json({ message: 'Product deleted successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error })
    }
}

