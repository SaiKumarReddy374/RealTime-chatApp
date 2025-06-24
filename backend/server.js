const express=require('express');
const dotenv=require('dotenv');

const app=express();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("API is running successully");
});
const Port =5000;
app.listen(Port,()=>{console.log(`Server is running on port ${Port}`)});