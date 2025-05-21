import express from "express";
import { protectRoute } from "../middleware/auth.middlware";
import { getUsersForSidebar, NewRequest } from "../controllers/message.controller";
import { getMessages } from "../controllers/message.controller";
const messageRouter=express.Router();


messageRouter.get("/users", protectRoute, getUsersForSidebar);

messageRouter.get("/:id",protectRoute,getMessages);










export default messageRouter;


