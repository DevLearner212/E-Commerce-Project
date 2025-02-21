import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [productSchema],

    totalPrice: {
        type: Number,
        trim: true,
    }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
