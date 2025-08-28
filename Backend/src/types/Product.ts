import { Date, Document } from "mongoose";

export interface IProduct extends Document {
    name: string
    price: number
    category: 'fruit' | 'vegetable' | 'dairy'
    createdAt?: Date
    updatedAt?: Date
}

export type ProductCreateInput = {
    name: string
    price: number
    category: 'fruit' | 'vegetable' | 'dairy'
}

export type ProductUpdateInput = Partial<ProductCreateInput>

