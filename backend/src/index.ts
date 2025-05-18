import express from "express";
import authRouter from "./routes/auth.route";
import connect from "./db";
import dotenv from "dotenv";

const app=express();
app.use(express.json());
dotenv.config();
app.use("/api/auth",authRouter);

app.listen(5001,async()=>{
    console.log("Server is running on port 5001");
    await connect();
});




