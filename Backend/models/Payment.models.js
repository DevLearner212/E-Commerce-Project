import mongoose from 'mongoose';
import { z } from 'zod'

// Define the Mongoose schema
const paymentschema = new mongoose.Schema({
    payerId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    signature: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
}, { timestamps: true });

// Create the Joi validation schema
const paymentValidationSchema = z.object({
    orderId: z.string().min(1, "Order ID is required"),
    paymentId: z.string().optional(),
    signature: z.string().optional(),
    amount: z.number().positive("Amount must be greater than 0"),
    currency: z.string().min(1, "Currency is required"),
    status: z.string().default('pending'), // Default value for status
});
// Export the Mongoose model and the validation schema
const paymentModel = mongoose.model("Payment", paymentschema);
export { paymentModel, paymentValidationSchema };
