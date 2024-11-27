import express from "express";
import { Router } from "express";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../Controllers/appointmentController.js";
import {isPatientAuthenticated , isAdminAuthenticated} from "../MiddleWare/isAuth.js"
const appointmentRouter = Router();


appointmentRouter.post("/post" , isPatientAuthenticated, postAppointment);
appointmentRouter.get("/get" , isAdminAuthenticated , getAllAppointments);
appointmentRouter.put("/update/:id" , isAdminAuthenticated , updateAppointmentStatus);
appointmentRouter.delete("/delete/:id" , isAdminAuthenticated , deleteAppointment);

export default appointmentRouter ;