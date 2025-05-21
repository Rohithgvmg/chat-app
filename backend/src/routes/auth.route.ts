

import express from "express";
import { logout, signin, signup, updateProfile,checkAuth } from "../controllers/auth.controllers";
import { protectRoute } from "../middleware/auth.middlware";

const authRouter=express.Router();

authRouter.post("/signup",(req,res)=>{signup(req,res)});

authRouter.post("/signin",(req,res)=>{signin(req,res)});

authRouter.post("/logout",(req,res)=>{logout(req,res)});

authRouter.put("/update-profile",protectRoute,async(req,res)=>{await updateProfile(req,res)});


authRouter.get("/check",protectRoute,checkAuth);

export default authRouter;


