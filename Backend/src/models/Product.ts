import mongoose, { Schema } from 'mongoose';
import type { IProduct } from '../types/Product';


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
}, {
    timestamps: true
});


const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;

