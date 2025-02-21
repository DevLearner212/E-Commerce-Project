import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// Define the user schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        required: [true, 'Full name is required'],
        minlength: 1,
        maxlength: 100
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    profileImage: {
        type: String,
        trim: true,
        default: null
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    phone: {
        type: Number,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            // Generate salt with 12 rounds
            const salt = await bcrypt.genSalt(12);
            // Hash the password using the generated salt
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});
// // Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
    const token = await jwt.sign(
        { id: this._id, email: this.email }, // Payload
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // Secret key

    );
    return token;
};

// Create the user model
const User = mongoose.model('User', userSchema);

export default User;
