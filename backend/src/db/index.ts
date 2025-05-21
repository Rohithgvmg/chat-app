
import mongoose from "mongoose"


 const connect=async ()=>{
    try{
        console.log("mongo ",process.env.MONGO_URI);
        const conn=await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected");
    }catch(e){
        console.log(e);
    }
}

export default connect;


