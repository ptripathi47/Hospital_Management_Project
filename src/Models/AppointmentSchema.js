
import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { User } from "./UserModel.js";

let appointmentSchema = new Schema(
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
       appointment_date: {
            type: String,
            required: true
       },
       department:{
            type: String,
            required: true
       },
       doctor: {
            firstName: {
                type: String,
                required: true,
            },
            lastName:{
                type: String,
                required: true,
            }
       },
       hasVisited: {
            type: Boolean,
            default: false,
            required: true
       },
       doctor_id: {
            type: Schema.Types.ObjectId,
            ref: User
       },
       patient_id: {
            type: Schema.Types.ObjectId,
            ref: User
       },
       address: {
            type: String,
            required: true
       },
       status: {
            type: String,
            enum: ["Pending" , "Accepted" , "Rejected"]
       }
       
    }
)

export const Appointment = mongoose.model("Appointment" , appointmentSchema);