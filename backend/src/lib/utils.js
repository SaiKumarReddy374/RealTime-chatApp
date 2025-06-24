const jwt = require('jsonwebtoken');

exports.generateTokens =(userId,res)=> {
    const token=jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
    )
    res.cookie('jwt', token, {
        maxAge: 3600000, // 1 hour
    
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie 
        secure: process.env.NODE_ENV !== 'develpoment', // Use secure cookies in production
        sameSite: 'Strict' // Helps prevent CSRF attacks
    });  
    return token; 
};