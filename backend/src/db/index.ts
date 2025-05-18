
import mongoose from "mongoose"


 const connect=async ()=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://manikanta23bce20077:RPCi1K4ygUjyDsHA@cluster0.url25si.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected");
    }catch(e){
        console.log(e);
    }
}

export default connect;


