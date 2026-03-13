const mongoose = require('mongoose');

const connectDB= async () =>{
    try{
        await mongoose.connect(process.env.DB_URI,{dbName:"Tourapp_db"})
        console.log("Dtabase Connected")

    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports=connectDB