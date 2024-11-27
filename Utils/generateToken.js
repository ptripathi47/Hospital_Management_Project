import ApiResponse from "./apiResponse.js";
const generateToken = async (user, message, statusCode, res) => {
    try {
        let token = await user.generateWebToken(); // Waits for the promise to resolve
        console.log(token);
        const cookieName = user.role === "Admin" ? "AdminToken" : "PatientToken";
        
        res.status(statusCode)
            .cookie(cookieName, token, { httpOnly : true , expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000) })
            .json(new ApiResponse(statusCode, [token, user], message));
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
};
export default generateToken;