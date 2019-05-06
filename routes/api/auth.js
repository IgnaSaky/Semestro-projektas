const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
const jwt = require('jsonwebtoken');
const jwtKey = require('../../config/auth');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
//connection.query('USE ' + dbconfig.database); Kodėl reikia?

router.get('/user',auth.authenticate, (req, res) => {
    const userID = req.user.id;
    
    const findByID = 'SELECT id,username,email,created FROM users where id = ?';
    db.query(findByID,[userID], (err, rows) => {
        console.log(rows);
        if (rows && rows.length > 0) {
            return res.json({user: rows[0]});
        }
        else {
            return res.json({message: "Neprisijunges"});
        }
    })	
});


/*router.post('/login', passport.authenticate('local'), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user
    /*delete req.user.password;
    res.status(200).json({user: req.user});
    const user = req.user
	const cleanUser = Object.assign({}, user)
	
	if (cleanUser.password) {
		delete cleanUser.password
	}
    res.json({ user: cleanUser, success: true });
});

router.post('/logout', (req, res) => {
    if (req.user) {
		req.logout();
		return res.json({ msg: 'Atsijungta' });
	} else {
		return res.json({ msg: 'Nesata prisijungęs' });
	}

});*/
router.post('/login', (req,res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('Užpildykite visus laukelius');
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
    
    let errors = [];
    if (!username || !email || !password1 || !password2) {
      errors.push('Please enter all fields' );
    } 
    if (password1 != password2) {
      errors.push('Passwords do not match');
    }  
    if (password1.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    if (errors && errors.length > 0) {
      res.json({errors:errors, success: false})
    } else {
        const query = 'SELECT * FROM users WHERE email = ? OR username = ?';
        db.query(query, [email, username], (err,rows) => {
            if(rows && rows.length > 0) {
                errors.push('El. pašto adresas arba vartotojo vardas jau naudojamas');
                res.status(400).json(errors);
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
                    db.query(insertQuery, newUser, (err, rows) => {
                        
                        if(err) {
                            errors.push('Įvyko klaida. Pabandykite dar kartą');
                            
                            return res.status(400).json(errors);
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
                                return res.status(200).json({success: true, user: insertedUser,token, errors:errors});
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