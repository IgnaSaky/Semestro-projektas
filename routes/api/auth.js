const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);

const bcrypt = require('bcryptjs');
const passport = require('passport');
//connection.query('USE ' + dbconfig.database); Kodėl reikia?

router.get('/user', (req, res) => {
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
});
router.post('/login', passport.authenticate('local'),(req, res) => {
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.password) {
			delete cleanUser.password
        }
		res.json({ user: cleanUser })
	}
);
  
router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'Atsijsungėte' })
	} else {
		return res.json({ msg: 'Jūs nesate prisijungęs' })
	}
})
  

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
                        //const success = [];
                        if(err) {
                            errors.push('Įvyko klaida. Pabandykite dar kartą');
                            
                            return res.json(errors);
                        } else {
                           
                            //res.redirect('/login')
                            return res.status(200).json({success: true, errors:errors});
                        }
                    });
                });
            });
        }
    });      
}
});



module.exports = router;