const express = require('express');
const router = express.Router({mergeParams: true});
const mysql = require('mysql');
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
const { isLoggedIn } = require('../../middleware/auth');
const bcrypt = require('bcryptjs')


router.put('/:id', /*isLoggedIn,*/ (req,res) => {
    console.log(req.body);
    const {id, oldPassword, newPassword1, newPassword2} = req.body;

    const sqlUpdate = 'UPDATE users \
                SET password=? \
                WHERE id=?';
    const sqlFind = 'SELECT username,password FROM users WHERE id = ?';
    db.query(sqlFind, [id], (err, rows) => {
        if (err) {
            console.log('At sqlFind',err.message);
            return res.json({message: "Įvyko klaida. Bandykite dar kartą", success: false});
        }
        if (rows && rows.length > 0) {
           bcrypt.compare(oldPassword, rows[0].password)
           .then((res) => {
                if (res) {
                    // Dar reikia hasshint pries saugant nauja i DB
                    db.query(sqlUpdate, [password, id], (err, rows) => {
                        if (err) {
                            console.log('At sqlUpdate', err.message);
                            return res.json({message: "Įvyko klaida. Bandykite dar kartą", success: false});
                        } else {
                            res.status(200).json({message: 'Slaptažodis atnaujintas', success: true});
                        }
                    });
                } else {
                    return res.json({message: 'Įvesas blogas senas slaptažodis', success:true});
                }
           });
        }
    });
});


module.exports = router;