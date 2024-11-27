import { Router } from "express";
const MessageRouter = Router();
import {getAllMessages, sendMessage} from "../Controllers/messageController.js"
import {isAdminAuthenticated} from "../MiddleWare/isAuth.js"

MessageRouter.post("/send" , sendMessage)
export default MessageRouter;

MessageRouter.get("/messages" , isAdminAuthenticated , getAllMessages);