const express = require('express');
const router = express.Router({mergeParams: true});
const mysql = require('mysql');
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
const { isLoggedIn } = require('../../middleware/auth');
const bcrypt = require('bcryptjs')


router.put('/:id', /*isLoggedIn,*/ (req,res) => {
    console.log(req.body);
    const {oldPassword, newPassword1, newPassword2} = req.body;
    const id = req.params.id;
    
    const sqlUpdate =  'UPDATE users \
                        SET password=? \
                        WHERE id=?';
    const sqlFind = 'SELECT username,password FROM users WHERE id = ?';
    if (newPassword1 !== newPassword2) {
        return res.json({message: 'Nesutampa nauji slaptažodžiai', success: false});
    }
    db.query(sqlFind, [id], (err, rows) => {
        if (err) {
            console.log('At sqlFind',err.message);
            return res.json({message: "Įvyko klaida. Bandykite dar kartą", success: false});
        }
        if (rows && rows.length > 0) {
           bcrypt.compare(oldPassword, rows[0].password)
           .then((result) => {
                if (result) {
                    // Dar reikia hasshint pries saugant nauja i DB
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            console.log(err.message);
                        }
                        bcrypt.hash(newPassword1, salt, (err, hash) => {
                            if (err) throw err;
                            db.query(sqlUpdate, [hash, id], (err, rows) => {
                                if (err) {
                                    console.log('At sqlUpdate', err.message);
                                    return res.json({message: "Įvyko klaida. Bandykite dar kartą", success: false});
                                } else {
                                    return res.status(200).json({message: 'Slaptažodis atnaujintas', success: true});
                                }
                            });
                        });
                    });       
                } else {
                    return res.json({message: 'Įvestas blogas senas slaptažodis', success: false});
                }
           });
        }
    });
});


module.exports = router;