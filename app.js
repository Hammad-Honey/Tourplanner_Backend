const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const port = process.env.APP_PORT;

//Routes
const authApis= require('./routes/authRoutes')

//Database
const connectDB=require('./config/db')
connectDB();


//Middlewares
const authTokenMiddleware=require('./middleware/authWithToken')

//Other Middlewares
app.use(cors({
    origin: ['http://localhost:5173'],
}));

app.get('/',(req,res)=>{
    res.status(200)
    res.json({appName:'Tour Planner Backed', status:'Running', listeningPort:'3000'})
})

app.use('/api/auth',authApis)
app.use('/api/edit_profile',authTokenMiddleware, (req,res)=>{
    
    res.status(200).json({message:"Authanticated datta accessed", request:{req}}) 
})

app.listen(port,()=>{
    console.log(`Server is running at  http://localhost:${port}`);
})
