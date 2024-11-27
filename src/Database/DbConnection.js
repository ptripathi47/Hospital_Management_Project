import mongoose  from "mongoose";

const ConnectDb = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Hospital_Management");
        console.log("DB Connected")
    } catch (error) {
        console.log("DB ERROR" , error);
    }
}

export default ConnectDb;