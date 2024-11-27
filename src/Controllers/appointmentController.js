import {Appointment} from "../Models/AppointmentSchema.js"
import apiResponse from "../../Utils/apiResponse.js"
import asyncHandler from "../../Utils/asynchandlers.js"
import {ApiError} from "../../Utils/apiError.js"
import ApiResponse from "../../Utils/apiResponse.js"




export const postAppointment  = asyncHandler(async(req , res , next) => {
    let {
        firstName ,
        lastName ,
        email ,
        phone_number,
        NIC,
       DOB,
       gender,
       appointment_date,
       department,
       doctor_firstName,
       doctor_lastName,
       hasVisited,
       address
    } = req.body;
    if( !firstName ||
        !lastName ||
        !email ||
        !phone_number||
        !NIC||
       !DOB||
       !gender||
       !appointment_date||
       !department||
       !doctor_firstName||
       !doctor_lastName||
       !hasVisited||
       !address){
        return next(new ApiError("Please enter the full details" , 400))
       }
    const isConflict = await Appointment.find({
        firstName : doctor_firstName,
        lastName : doctor_lastName,
        role: "Doctor",
        doctorDepartment : department,
    });
    if (isConflict.length === 0){
        return next(new ApiError("Doctor Not found" , 400));
    }
    if(isConflict.length > 1){
        return next(new ApiError("Doctor Conflict Please contact through Email or Phone" , 404));
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName ,
        lastName ,
        email ,
        phone_number,
        NIC,
       DOB,
       gender,
       appointment_date,
       department,
       doctor:{
        firstName : doctor_firstName,
        lastName : doctor_lastName,
       },
       hasVisited,
       address,
       doctorId,
       patientId
    });
    res.status(200).json(new ApiResponse(200 , appointment , "Appointment Sent Successfully"))
});

export const getAllAppointments = asyncHandler(async(req , res) => {
    const appointment = await Appointment.find();
    res.status(200).json(new apiResponse(200 , appointment , "All appointments..."));
});

export const updateAppointmentStatus = asyncHandler(async(req , res) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ApiError("Appointment Not found" , 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id , req.body , {
        new : true ,
        runValidators : true,
        useFindAndModify : false,
    });
    res.status(200).json(new ApiResponse(200 , appointment , "Appointment updated successfully..") )
});

export const deleteAppointment = asyncHandler(async(req , res) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ApiError("Appointment Not found" , 404));
    };
    await appointment.deleteOne();
    res.status(200).json(new ApiResponse(200 , "nothing" , "Appointment Deleted Successfully"));
});