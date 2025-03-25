import mongoose from 'mongoose'

const MongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log("something wrong in server",error)
    }
}
export default MongoDB