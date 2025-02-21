import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    headlines: {
        type: String,
        required: true,
        trim: true,
    },

    bio: {
        type: String,
        trim: true,

    },
    Blogpost: {
        type: String, // URL for the profile image
    },

}, { timestamps: true });

// Middleware to update `updatedAt` field before saving
blogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Blogs = mongoose.model('Blog', blogSchema);

export default Blogs;
