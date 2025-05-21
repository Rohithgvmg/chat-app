import { Request,Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import cloudinary from "../utils/cloudinary";

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

              // generateToken(newUser._id as unknown as String,res);
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

export const signin=async (req:Request,res:Response)=>{

  try{
     const {email,password}=req.body;
     
     if(!email || !password){
          return res.status(400).json({
                message:"All fields are required"
             })
     }

     const user=await User.findOne({email});

     if(!user){
         return res.status(400).json({
              message:"Invalid credentials"
         })
     }

     const isPasswordValid=await bcrypt.compare(password,user.password);
     if(!isPasswordValid){
      return res.status(400).json({ message: "Invalid credentials" });
     }

      generateToken(user._id as unknown as String,res);

       res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });


  } catch(error:any){
         console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  
  }
}

export const logout=(req:Request,res:Response)=>{
     try{
      res.cookie("jwt","",{maxAge:0});
      res.status(200).json({
        message:"Logged out successfully"
      });
     } catch(error:any){
         console.log("Error in logout controller",error.message);
         res.status(500).json({
          message:"Internal server error"
         });
     }
};

export const updateProfile=async (req:Request,res:Response)=>{

      try{
          const {profilePic}=req.body;

          if(!profilePic){
            return res.status(400).json({message:"Profile picture is required"});
          }

          const uploadResponse=await cloudinary.uploader.upload(profilePic);
          //@ts-ignore
          const updatedUser=await User.findByIdAndUpdate(req.user._id,{
            profilePic:uploadResponse.secure_url
          },{new:true});

          res.status(200).json({
            message:"Profile updated successfully",
            user:updatedUser
          })
      }
      catch(error:any){
        console.log("Error in updateProfile controller",error.message);
        res.status(500).json({message:"Internal server error"});
      }
};

export const checkAuth= (req:Request,res:Response)=>{
  try{
    res.status(200).json({
      //@ts-ignore
       user:req.user  
    })
  }
  catch(error:any){
    console.log("Error in checkAuth controller",error.message);
    res.status(500).json({message:"Internal server error"});
  }
  
}
