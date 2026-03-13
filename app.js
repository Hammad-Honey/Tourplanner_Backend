const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const port = process.env.APP_PORT;
//Routes
const AuthRoutes= require('./routes/authRoutes')
//Database
const DB=require('./config/db')

DB();

app.use(cors({
    origin: ['http://localhost:5173'],
}));

app.get('/',(req,res)=>{
    res.status(200)
    res.json({appName:'Tour Planner Backed', status:'Running', listeningPort:'3000'})
})

app.use('/api/auth',AuthRoutes)
app.use('/api/edit_profile', (req,res)=>{res.send("Hello World")})

app.listen(port,()=>{
    console.log(`Server is running at  http://localhost:${port}`);
})
