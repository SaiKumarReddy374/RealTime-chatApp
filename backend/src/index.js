const express=require('express');
const dotenv=require('dotenv');
const {connectDB} = require('./lib/db.js');
const cookieParser = require('cookie-parser');
const messageRoutes=require('./routes/message.route.js');
const authRoutes=require('./routes/auth.route.js');
const cors= require('cors');
const {server, app } = require('./lib/socket.js');
import { fileURLToPath } from 'url';
import path from 'path';

// This replaces __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend','dist','index.html'));
    }); 
}
app.get('/',(req,res)=>{
    res.send("API is running successully");
});
const PORT =process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log('running on port: '+PORT);
    connectDB();
});