import { Request,Response } from "express";


export const signup=(req:Request,res:Response)=>{
   res.send("signup route");
}

export const signin=(req:Request,res:Response)=>{
    res.send("signin route");
}

export const logout=(req:Request,res:Response)=>{
     res.send("logout route");
}

