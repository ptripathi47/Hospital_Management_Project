import { json } from "express";
import { ApiError } from "../../Utils/apiError.js";
import ApiResponse from "../../Utils/apiResponse.js";
import asyncHandler from "../../Utils/asynchandlers.js";
import { Message } from "../Models/MessageModel.js";

export const sendMessage = asyncHandler(async(req , res ) => {
    let {firstName , lastName , email , phone_number , message} = req.body;
    if (!firstName || !lastName || !email || !phone_number || !message){
        throw new ApiError(400 , "Enter fill all the details properly");
        // return res.status(400).json(
        //     {
        //         success : false,
        //         status: 400,
        //         message: "Enter all the details properly"
        //     }
        // )
        // return res.status(200).json(
        //      new ApiResponse(200 , createdUser , "work completed" , ))
    }
    let user = await Message.create({ firstName , lastName , email , phone_number , message});
    console.log("send Message Loaded")
    return res.status(200).json( new ApiResponse(200 , user , "Message sender registerd Successfully"))
})

export const getAllMessages = asyncHandler(async(req , res , next) => {
    const messages = await Message.find();
    return res.status(200).json(new ApiResponse(200 , messages , "Message delivered successfully..."))
})