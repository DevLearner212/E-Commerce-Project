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
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, trim: true }
    }],
    userView: {
        type: Number,
        min: 0
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
