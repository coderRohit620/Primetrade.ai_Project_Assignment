import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connetionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(
            `\n MongoDB connected !! DB HOST: ${connetionInstance.connection.host}`
        )
        
    } catch (error) {
        console.log("MongoDB connection error", error)
        process.exit(1);
    }
}

export default connectDB;