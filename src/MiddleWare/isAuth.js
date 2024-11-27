import { ApiError } from "../../Utils/apiError.js";
import asyncHandler from "../../Utils/asynchandlers.js";
import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel.js";

export const isAdminAuthenticated = asyncHandler(async(req , res , next) => {
    let token = req.cookies.AdminToken;
    if(!token){
        return next(new ApiError("User is not authenticated" , 400))
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin") {
        return next(new ApiError(400 , `${req.user.role} is not authorized for this resources`))
    }
    next();
})


export const isPatientAuthenticated = asyncHandler(async(req , res , next) => {
    let token = req.cookies.PatientToken;
    if(!token){
        return next(new ApiError("User is not authenticated" , 400))
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Patient") {
        return next(new ApiError(400 , `${req.user.role} is not authorized for this resources`))
    }
    next();
})
