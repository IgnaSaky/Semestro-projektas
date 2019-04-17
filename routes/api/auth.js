const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('Connected to DB');
});
const bcrypt = require('bcryptjs');
const passport = require('passport');
//connection.query('USE ' + dbconfig.database); Kodėl reikia?

router.get('/getUsers' , (req,res) => {
  db.query('SELECT * FROM users', (err, values) => {
    res.json(values);
  });
  
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      //successRedirect: '/',
      //failureRedirect: '/users/login',
    })(req, res, next);
  });
  
  router.get('/logout', (req, res) => {
    req.logout();
    
    //res.redirect('/users/login');
    res.json('Atsijungta');
  });
  

router.post('/register', (req, res) => {
    const { username, email, password1, password2 } = req.body;
    let errors = [];

    if (!username || !email || !password1 || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    } 
    if (password1 != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }  
    if (password1.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors && errors.length > 0) {
      res.json(errors);   
    } else {
        const query = 'SELECT * FROM users WHERE email = ? OR username = ?';
        db.query(query, [email, username], (err,rows) => {
            if(rows && rows.length > 0) {
                errors.push({ msg: 'El. pašto adresas arba vartotojo vardas jau naudojamas' });
                res.json(errors);
            } else {
                const today = new Date();
                const newUser = {
                    username,
                    password: password1,
                    email,
                    created: today
                }
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    const insertQuery = 'INSERT INTO users SET ?';
                    db.query(insertQuery, newUser, (err, rows) => {
                        const msg = [];
                        if(err) {
                            //msg.push('Įvyko klaida. Pabandykite dar kartą');
                            msg.push(err.message);
                            res.json(msg);
                        } else {
                            msg.push('Registracija sėkminga');
                            //res.redirect('/login')
                            res.json(msg);
                        }
                    });
                });
            });
        }
    });      
}
});



module.exports = router;