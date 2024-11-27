
import mongoose, { Schema } from "mongoose";
import validator from "validator"
const messageSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        minLength : [3 , "First Name should contain atleast 3 character"]
    },
    lastName : {
        type : String,
        required : true,
        minLength : [3 , "Last Name should contain atleast 3 character"]
    },
    email : {
        type : String,
        required : true,
        validate: [validator.isEmail , "Please enter a valid email.."]   
    },
    phone_number: {
        type: String,
        required : true,
        minLength: [10 , "Phone Number must be 10 digit"]
    },
    message: {
        type : String,
        required : true,
        minLength : [10 , "Message should contain atleast 10 character"],
        maxLength : [100 , "Message can contain atmost 100 character"]
   }
})

export const Message = mongoose.model("Message" , messageSchema);

