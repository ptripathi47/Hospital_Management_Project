
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
const userSchema = new mongoose.Schema(
    {
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
            minLength: [10 , "Phone Number must be 10 digit"],
            maxLength: [10 , "Phone Number cannot be exceed than 10 digit"]
        },
        NIC: {
            type : String,
            required : true,
            minLength : [13 , "NIC should contain atleast 10 character"],
            maxLength : [13 , "NIC can contain atmost 13 character"]
       },
       DOB: {
            type: Date,
            required: [true, "DOB is Required to fill"]
       },
       gender: {
            type: String, 
            required: true,
            enum: ["male" , "female" , "Others"]
       },
       password: {
            type: String, 
            required: true,
            minLength: [8 , "Password must contain 8 characters"]
       },
       role:{
            type: String,
            required: true,
            enum: ["Patient" , "Admin" , "Doctor"]
       },
       doctorDepartment:{
            type: String
       },
       doc_Avatar: {
            public_id : String,
            url : String
        }
    }
)

userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10);
});

userSchema.methods.comaprePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password);
};


userSchema.methods.generateWebToken = async function (){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET_KEY , {expiresIn : process.env.JWT_EXPIRES});
};

export const User = mongoose.model("User" , userSchema);