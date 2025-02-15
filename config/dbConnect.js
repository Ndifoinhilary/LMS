import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to db successfully!');
    }
    catch (error) {
        console.log("DB connection error:", error);
        process.exit(1);
    }
}

// jYOVJjV0Pnj4ifA8

export default dbConnect;