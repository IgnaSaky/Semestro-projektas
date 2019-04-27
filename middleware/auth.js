const auth = {}

auth.isLoggedIn = function (req,res,next) {  
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        //res.redirect('/users/login');
        res.json({message: 'Pirmiau turite prisijungti', success: false});
    }
}
module.exports = auth;