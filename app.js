import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import userRouter from "./src/Routes/userRouter.js"
import MessageRouter from "./src/Routes/messageRouter.js"
import appointmentRouter from "./src/Routes/appointmentRouter.js";
import cors from "cors";
import fileUpload from "express-fileupload";
const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
    origin: [process.env.FRONTEND_URI , process.env.DASHBOARD_URI], 
    credentials: true,
    methods : [`'GET'`, `'POST'`, `'PUT'` ,  `'DELETE'`]
    }
));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}))

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/Message" , MessageRouter);
app.use("/api/v1/appointment", appointmentRouter);















export default app;
