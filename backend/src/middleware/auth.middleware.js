const jwt= require('jsonwebtoken');
const User = require('../models/user.model.js');

exports.protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt; // Get the JWT from cookies
    if (!token) {
        return res.status(401).json({ error: "Unauthorized, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ error: "Unauthorized, invalid token" });
        }

        const user = await User.findById(decoded.userId).select('-password'); 
        if(!user){
            return res.status(401).json({ error: "Unauthorized, user not found" });
        }

        req.user=user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized, invalid token"+error.meassage });
    }
}  