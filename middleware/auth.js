const auth = {}

auth.isLoggedIn = function (req,res,next) {  
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        //res.redirect('/users/login');
        res.json('Pirmiau turite prisijungti');
    }
}
module.exports = auth;