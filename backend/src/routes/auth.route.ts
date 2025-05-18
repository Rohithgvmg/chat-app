

import express from "express";
import { logout, signin, signup } from "../controllers/auth.controllers";

const authRouter=express.Router();

authRouter.get("/signup",signup);

authRouter.get("/signin",signin);

authRouter.get("/logout",logout);

export default authRouter;


