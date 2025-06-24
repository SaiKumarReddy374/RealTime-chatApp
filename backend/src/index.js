const express=require('express');
const dotenv=require('dotenv');
const {connectDB} = require('./lib/db.js');
const cookieParser = require('cookie-parser');
const messageRoutes=require('./routes/message.route.js');
const authRoutes=require('./routes/auth.route.js');

const app=express();
dotenv.config();


app.use('/api/auth', authRoutes);
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send("API is running successully");
});
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('running on port: '+PORT);
    connectDB();
});