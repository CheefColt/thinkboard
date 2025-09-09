import mongoose from "mongoose"

export const connectDB = async (MONGODB_CONNECT_URL) => {
    try{
        mongoose.connect(MONGODB_CONNECT_URL);
        console.log("Mongo DB Connected Successfully");
    } catch (error){
        console.error("Error connecting to MongoDB\n",error);
        process.exit(1); // exit with failure, 0 -> successful, 1 -> unsuccessful
    }
}

