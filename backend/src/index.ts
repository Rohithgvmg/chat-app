import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from "express";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import connect from "./db";

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);

app.listen(5001,async()=>{
    console.log("Server is running on port 5001");
    await connect();
});




