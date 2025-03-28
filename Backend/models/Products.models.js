import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
        maxlength: 200
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Product description is required'],
        maxlength: 1000
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: 0
    },
    category: {
        type: String,
        trim: true,
        required: [true, 'Product category is required']
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: 0
    },
    image: {
        type: String,
        trim: true,
        default: null
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
