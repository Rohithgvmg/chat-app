import { Request, Response } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";
import Message from "../models/message.model";
import {v2 as cloudinary} from "cloudinary";

export interface NewRequest extends Request{
    user?: Record<string,any>;
}

export const getUsersForSidebar=async(req:NewRequest,res:Response)=>{

    try{
        if(!req.user){
           res.status(401).json({message:"Unauthorized"});
           return ;
        }
        const filteredUsers=await User.find({_id:{$ne:req.user._id}}).select("-password");
        res.status(200).json({filteredUsers});
    }
    catch(error:any){
        console.log("Error in getUsersForSidebar controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};



export const getMessages=async(req:NewRequest,res:Response)=>{
    try{
        if(!req.user){
            res.status(401).json({message:"Unauthorized"});
            return ;
        }

        const {id:userToChatId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
             $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
             ]
        });

        res.status(200).json({messages});
    }
    catch(error){
        console.log("Error in getMessages controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}


export const sendMessage=async(req:NewRequest,res:Response)=>{
       
    try{
        if(!req.user){
            res.status(401).json({message:"Unauthorized"});
            return ;
        }

        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;

        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;


        }


        const newMessage=new Message({
            text,
            image:imageUrl,
            senderId,
            receiverId
        });

        await newMessage.save();

        //todo: realtime functionality =>socket io

        res.status(201).json(newMessage);
        
    }
    catch(error){
        console.log("Error in sendMessage controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}
