const express = require('express');
//const db = require('../../config/sequelize');
const User = require('../../models/User');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);

const bcrypt = require('bcryptjs');
const passport = require('passport');
//connection.query('USE ' + dbconfig.database); Kodėl reikia?
db.connect((err) => {
    if (err) {
        console.log(err);
    }
});


router.post('/login', (req, res) => {
    db.query("SELECT * FROM user WHERE email = ? ", [req.body.email], function (err, rows) {
        if (err) {
            throw err;
        }
        if (!rows.length) {
            return console.log("Neteisingas emailas");
        }
        if (req.body.password != rows[0].password) {
            console.log("Neteisingas slaptazodis.");
        }
        else {
            console.log("Prisijungta.");
        }
    });
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
        const query = 'SELECT * FROM user WHERE email = ? OR username = ?';
        db.query(query, [email, username], (err,rows) => {
            if(rows.length > 0) {
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
                    const insertQuery = 'INSERT INTO user SET ?';
                    db.query(insertQuery, newUser, (err, rows) => {
                        const msg = [];
                        if(err) {
                            msg.push('Įvyko klaida. Pabandykite dar kartą');
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