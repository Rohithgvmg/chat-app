

import express from "express";
import { logout, signin, signup } from "../controllers/auth.controllers";

const authRouter=express.Router();

authRouter.post("/signup",(req,res)=>{signup(req,res)});

authRouter.post("/signin",signin);

authRouter.post("/logout",logout);

export default authRouter;


