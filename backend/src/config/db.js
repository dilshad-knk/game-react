import mongoose from 'mongoose';


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB );
        console.log("Db connected");
        
    } catch (error) {
        console.error(error);
    }
}

export default connectDb;