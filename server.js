import app from "./app.js";
import ConnectDb from "./src/Database/DbConnection.js";

import dotenv from "dotenv";

import cloudinary from "cloudinary";

dotenv.config({path: "./.env"})
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

ConnectDb().then(()=>{
    app.listen(process.env.PORT || 4000 , ()=>{
        console.log(`Server listening on port ${process.env.PORT}`);
    });
})
