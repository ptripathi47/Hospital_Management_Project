import { User } from "../Models/UserModel.js";
import { ApiError } from "../../Utils/apiError.js";
import asyncHandler from "../../Utils/asynchandlers.js";
import ApiResponse from "../../Utils/apiResponse.js";
import generateToken from "../../Utils/generateToken.js";
import cloudinary from "cloudinary";

export const patientRegister = asyncHandler(async(req , res , next) => {
    let {firstName , lastName , email , phone_number , NIC , DOB , gender , password , role} = req.body;
    if(!firstName || !lastName || !email || !phone_number || !NIC || !DOB || !gender || !password || !role){
        return next(new ApiError("Enter the full detail" , 400))
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ApiError( "User already registered" , 409))
    }
    user = await User.create({firstName , lastName , email , phone_number , NIC , DOB , gender , password , role});
    res.status(200).json( new ApiResponse(200 , user , "User Registered Successfully"))
    
})

export const login = asyncHandler(async(req , res , next) => {
    let {email , password , confirmPassword , role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ApiError("Enter the full details properly" , 400))
    }
    if(password !== confirmPassword){
        return next(new ApiError("Password and Confirm password does not match" , 400))
    }
    let user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ApiError("Invalid email or password" , 400))
    }
    let isMatchPassword = user.comaprePassword(password);
    if(!isMatchPassword){
        return next(new ApiError("Invalid email or password" , 400));
    }
    if(role != user.role){
        return next(new ApiError("User with this role not found" , 400));
    }
    generateToken(user , "User Login successfully" , 200 , res)
    
})

export const addNewAdmin = asyncHandler(async (req , res , next) => {
    let {firstName , lastName , email , phone_number , NIC , DOB , gender , password } = req.body;
    if(!firstName || !lastName || !email || !phone_number || !NIC || !DOB || !gender || !password ){
        return next(new ApiError("Enter the full detail" , 400));
    }
    let isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ApiError( "Admin already registered with this credentials" , 409));
    }
    let admin = await User.create({firstName , lastName , email , phone_number , NIC , DOB , gender , password , role : "Admin"});
    res.status(200).json(new ApiResponse(200 , admin , "Admin registered Successfully !!!"));
})

export const getAllDoctors = asyncHandler(async(req , res ) => {
    const Doctors = await User.find({role : "Doctor"})
    res.status(200).json(new ApiResponse(200 , Doctors , "All Doctor are provided..."));
})

export const getUserDetails = asyncHandler(async(req , res) => {
    const user = req.user;
    res.status(200).json(new ApiResponse(200 , user , "User detail provided successfully..."));
})

export const logoutAdmin = asyncHandler(async(req , res) => {
    return res.status(200)
    .cookie("AdminToken" , "", {httpOnly : true , expires : new Date(Date.now())})
    .json(new ApiResponse(200 , "" , "Admin Logout successfully..."));
})

export const logoutPatient = asyncHandler(async(req , res) => {
    return res.status(200)
    .cookie("PatientToken" , "" , {httpOnly : true , expires: new Date(Date.now())})
    .json(new ApiResponse(200 , "" , "Patient Logout successfully..."));
})

export const addNewDoctor = asyncHandler(async(req , res , next) => {
    if (!req.files || Object.keys(req.files).length === 0){
        return next(new ApiError("Doctor Avatar Required!" , 400));
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png" , "image/jpeg" , "image/webp"]
    if(!allowedFormats.includes()){
        return next(new ApiError("File Format Not Supported!", 400));
    }
    const {firstName , lastName , email , phone_number , NIC , DOB , gender , password , doctorDepartment } = req.body
    if(!firstName || !lastName || !email || !phone_number || !NIC || !DOB || !gender || !password || !doctorDepartment){
        return next(new ApiError("Please , Enter the full detail" , 400))
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ApiError(`${isRegistered.role} is already registered` , 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:", cloudinaryResponse.error || 
            "Unknown Cloudinary Error"
        )
    }
    
    const doctor = await User.create({firstName , lastName , email , phone_number , 
        NIC , DOB , gender , password , doctorDepartment , role:"Doctor" 
        , docAvatar: {public_id : cloudinaryResponse.public_id , url: cloudinaryResponse.secure_url}
    });
    res.status(201).json(new ApiResponse(201 , doctor , "Doctor registerd successfully!!!"))
    
})