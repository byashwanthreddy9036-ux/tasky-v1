import mongoose from "mongoose"
import dotenv, { config } from "dotenv"

dotenv.config()

const db = process.env.Mongo_URL

const dbConnect = async () => {
    try {
        await mongoose.connect(db)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database did not connect")
        console.log(error);
    }
}

dbConnect()

export default dbConnect