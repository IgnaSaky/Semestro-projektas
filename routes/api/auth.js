const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
const jwt = require('jsonwebtoken');
const jwtKey = require('../../config/auth');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
var session;
//connection.query('USE ' + dbconfig.database); Kodėl reikia?

router.get('/user',auth.authenticate, (req, res) => {
    const userID = req.user.id;
    
    const findByID = 'SELECT id,username,email,created FROM users where id = ?';
    db.query(findByID,[userID], (err, rows) => {
        //console.log('from /api/auth/user',rows);
        if (rows && rows.length > 0) {
            return res.json({user: rows[0]});
        }
        else {
            return res.json({message: "Neprisijunges"});
        }
    })	
});

router.post('/login', (req,res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message:'Užpildykite visus laukelius'});
    }
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err,rows) => {
        
        if(!rows || rows.length < 1) {
            return res.status(400).json({message: 'Vartotojas su tokiu el. paštu neegzistuoja'});
        }
        //validate password
        //console.log('password in login',rows[0].password);
        bcrypt.compare(password,rows[0].password)
        .then(isMatch => {
            if (!isMatch) return res.status(400).json({message: "Neteisingas slaptažodis"});
            module.exports.session = rows[0].id;
            jwt.sign({
                id: rows[0].id,
                username: rows[0].username,
                email: rows[0].email
            }, jwtKey.secret, {expiresIn: 36000}, (err,token) => {
                if (err) throw err;
                //console.log('I got there');
                 return res.status(200).json({success: true, user: rows[0],token});
                
            });
        })

    });
    
});
router.post('/register', (req, res) => {
    const { username, email, password1, password2 } = req.body;
    
    if(!username || !email || !password1 || !password2) {
        return res.status(400).json({ message: 'Užpildykite visus laukelius' });
    } else {
        const query = 'SELECT * FROM users WHERE email = ? OR username = ?';
        db.query(query, [email, username], (err,rows) => {
            if(rows && rows.length > 0) {
                
                res.status(400).json({message:"Toks vartotojas jau registruotas"});
            } else {
                const today = new Date();
                let newUser = {
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
                    db.query(insertQuery, [newUser], (err, rows) => {
                        
                        if(err) {     
                            return res.status(400).json({message: 'Įvyko klaida. Pabandykite dar kartą'});
                        } else {
                           
                            const insertedUser = {
                                username,
                                email,
                                id: rows.insertId
                            }
                            jwt.sign({
                                id: insertedUser.id,
                                username: insertedUser.username,
                                email: insertedUser.email
                            }, jwtKey.secret, {expiresIn: 36000}, (err,token) => {
                                if (err) throw err;
                                return res.status(200).json({success: true, user: insertedUser,token});
                            });
                            //console.log(rows)               
                        }
                    });
                });
            });
        }
    });      
}
});
module.exports = router;