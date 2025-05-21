import { Request,Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectRoute = async (req:Request,res:Response,next:NextFunction)=>{

      try{
            const token=req.cookies.jwt;

            if(!token){
                  res.status(401).json({message:"Unauthorized - No token provided"});
                  return;
            }

            const decoded=jwt.verify(token,process.env.JWT_SECRET!);

            if(typeof decoded === "string"){
                  res.status(401).json({message:"Unauthorized - Invalid token"});
                  return;
            }

            //@ts-ignore
            const user=await User.findById(decoded.userId).select("-password");

            if(!user){
                  res.status(404).json({message:"User not found"});
                  return;
            }

            //@ts-ignore
            req.user=user;
            next();

      }catch(error){
            console.log("Error in protectRoute middleware:",error);
            res.status(500).json({message:"Internal server error"});
            return;
      }
}