const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
/*db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('Connected to DB');
});*/
const bcrypt = require('bcryptjs');
const passport = require('passport');
//connection.query('USE ' + dbconfig.database); Kodėl reikia?

router.get('/user', (req, res, next) => {
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
			console.log(`Deleting ${cleanUser.password}`)
			delete cleanUser.password
		}
		res.json({ user: cleanUser })
	}
)
  
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
      errors.push({ msg: 'Please enter all fields' });
    } 
    if (password1 != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }  
    if (password1.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors && errors.length > 0) {
      res.status(400).json(errors);   
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
                        //const success = [];
                        if(err) {
                            errors.push({msg:'Įvyko klaida. Pabandykite dar kartą'});
                            
                            res.json(errors);
                        } else {
                           
                            //res.redirect('/login')
                            res.json({success: 'Registracija sėkminga', redirectTo: '/'});
                        }
                    });
                });
            });
        }
    });      
}
});



module.exports = router;