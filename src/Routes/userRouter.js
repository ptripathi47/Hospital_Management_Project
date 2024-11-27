import { Router } from "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, 
        getUserDetails, login, logoutAdmin, 
        logoutPatient, patientRegister } from "../Controllers/userController.js";

const userRouter = Router();

import {isAdminAuthenticated , isPatientAuthenticated} from "../MiddleWare/isAuth.js"

userRouter.post("/patient/register" , patientRegister);
userRouter.post("/login" , login);
userRouter.post("/admin/addNew" , isAdminAuthenticated, addNewAdmin);
userRouter.post("/doctor/addNew" , isAdminAuthenticated , addNewDoctor)
userRouter.get("/doctors" , getAllDoctors);
userRouter.get("/patient/me" , isPatientAuthenticated ,getUserDetails);
userRouter.get("/admin/me" , isAdminAuthenticated ,getUserDetails );
userRouter.get("/admin/logout", isAdminAuthenticated , logoutAdmin);
userRouter.get("/patient/logout" , isPatientAuthenticated , logoutPatient);

export default userRouter; // Export the Route object instead of Router