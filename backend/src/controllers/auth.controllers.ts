import { Request,Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
//use zod 
export const signup=async (req:Request,res:Response)=>{
    try{
          const {fullName,email,password}=req.body;
          
          if(!fullName || !email || !password){
             return res.status(400).json({
                message:"All fields are required"
             })
          }

          if(password.length<6){
            return res.status(400).json({
                message:"Password must be at least 6 characters"
            })
          }


          const user=await User.findOne({email});

           if (user) return res.status(400).json({ message: "Email already exists" });


           const salt=await bcrypt.genSalt(10);
           const hashedPassword=await bcrypt.hash(password,salt);

           const newUser=new User({
              fullName,
              email,
               password:hashedPassword
           });

           if(newUser){

              generateToken(newUser._id as unknown as String,res);
              await newUser.save();
              res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
              })
           }

         else{
             res.status(400).json({
                message:"Invalid user data"
             });
         }

    } catch(error:any){
          console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signin=(req:Request,res:Response)=>{
    res.send("signin route");
}

export const logout=(req:Request,res:Response)=>{
     res.send("logout route");
}

