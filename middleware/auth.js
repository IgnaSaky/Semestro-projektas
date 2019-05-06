const jwtKey = require('../config/auth');
const jwt = require('jsonwebtoken');

const auth = {}

auth.isLoggedIn = function (req,res,next) {  
    next();
}
auth.authenticate = function(req,res,next) {
    const token = req.header('x-auth-token');
    //check if token exist
    if (!token) {
        res.status(401).json({message: "No token. Authorizations denied"});
    }
    try {
        const decoded = jwt.verify(token, jwtKey.secret);
        //add user from payload
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(400).json({message: 'Token is not valid'});
    }
    //verify token

}
module.exports = auth;