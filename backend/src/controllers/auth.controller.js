const express = require('express');
const User = require('../models/user.model.js');
const bcrypt =require('bcryptjs');
const { generateTokens } = require('../lib/utils.js');
const router = express.Router();
exports.signup = async (req, res) => {
    const { fullName, password,email } = req.body;
    try {
        if(password.length<6){
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({ error: "User already exists with this email" });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);  

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });
        generateTokens(newUser._id, res); // ✅ Then generate token

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        }); 
        // res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error signing up user" });
    }
};

exports.login = async (req, res) => {
    const{email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){  
            return res.status(400).json({ error: "inava;id credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        generateTokens(user._id, res); // ✅ Then generate token
       return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        }); 
        // res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
};

exports.logout = async (req, res) => {
    try {
        res.cookie('jwt',"",{maxAge:0}); // Clear the cookie by setting maxAge to 0
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: "Error logging out" });
    }
};

exports.updateProfile = async (req, res) => {
    try{
        const {profilePic}=req.body;
        const userId = req.user._id; 
        if(!profilepic){
            return res.status(400).json({ error: "Profile picture is required" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url, }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Error updating profile" });
    }
}

exports.checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      // If `req.user` is not present, send a 401 Unauthorized response and stop execution
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }
    return res.status(201).json(req.user);
  } catch (error) {
    console.log("error in checking auth controller  ", error.message);
    return res.status(400).json({ message: "error in checking authorisation" });
  }
};