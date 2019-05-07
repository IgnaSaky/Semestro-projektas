const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
var session;
const bcrypt = require('bcryptjs');
const passport = require('passport');
//connection.query('USE ' + dbconfig.database); Kodėl reikia?

router.get('/user', (req, res) => {
    if (req.user) {
        return res.status(200).json({ user: req.user })
    } else {
        return res.status(200).json({ message: 'Neprisijunges' });
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user
    /*delete req.user.password;
    res.status(200).json({user: req.user});*/
    const user = JSON.parse(JSON.stringify(req.user)) // hack
    const cleanUser = Object.assign({}, user)
    module.exports.session = JSON.parse(JSON.stringify(req.user));

    if (cleanUser.password) {
        delete cleanUser.password
    }
    res.json({ user: cleanUser, success: true });
});

router.get('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        req.session.destroy((err) => {
            if (!err) {
                res.status(200).clearCookie('connect.sid', { path: '/' }).json({ message: "Atsijungta", success: true });
            }
        });
    } else { return res.json({ message: 'Neprisijunges', success: false }) }
});
router.post('/register', (req, res) => {
    const { username, email, password1, password2 } = req.body;
    let errors = [];
    if (!username || !email || !password1 || !password2) {
        errors.push('Please enter all fields');
    }
    if (password1 != password2) {
        errors.push('Passwords do not match');
    }
    if (password1.length < 6) {
        errors.push('Password must be at least 6 characters');
    }
    if (errors && errors.length > 0) {
        res.json({ errors: errors, success: false })
    } else {
        const query = 'SELECT * FROM users WHERE email = ? OR username = ?';
        db.query(query, [email, username], (err, rows) => {
            if (rows && rows.length > 0) {
                errors.push('El. pašto adresas arba vartotojo vardas jau naudojamas');
                res.status(400).json(errors);
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
                            //const success = [];
                            if (err) {
                                errors.push('Įvyko klaida. Pabandykite dar kartą');
                                return res.status(400).json(errors);
                            } else {
                                //res.redirect('/login')
                                return res.status(200).json({ success: true, errors: errors });
                            }
                        });
                    });
                });
            }
        });
    }
});
module.exports = router;