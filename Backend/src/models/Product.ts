import mongoose, { Schema } from 'mongoose';


interface IProduct {
    name: string;
    price: number;
    category: 'fruit' | 'vegetable' | 'dairy';
}

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
        enum: ['fruit', 'vegetable', 'dairy']
    }
});


const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;