import mongoose from 'mongoose';
const dbconnection = async () => {
    try {
        // Use the environment variable for database URI
        const uri = process.env.MONGODB_URI;

        // Connect to MongoDB
        const connection = await mongoose.connect(uri);

        console.log("Mongodb database connected Successfully")
    } catch (error) {
        console.log("Mongodb connection failed", error.message)

        // Optionally, you can exit the process if connection fails

    }
};

export default dbconnection;
