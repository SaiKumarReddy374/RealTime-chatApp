const express=require('express');
const dotenv=require('dotenv');
const {connectDB} = require('./lib/db.js');
const cookieParser = require('cookie-parser');
const messageRoutes=require('./routes/message.route.js');
const authRoutes=require('./routes/auth.route.js');
const cors= require('cors');

const app=express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth', authRoutes);
app.get('/',(req,res)=>{
    res.send("API is running successully");
});
const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('running on port: '+PORT);
    connectDB();
});