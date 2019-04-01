const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const connection = mysql.createConnection(dbconfig.connection);
//connection.query('USE ' + dbconfig.database); Kodėl reikia?
connection.connect((err) => {
    if (err) {
        console.log(err);
    }
})

router.post('/login', (req, res) => {
    connection.query("SELECT * FROM purchaser WHERE email = ? ", [req.body.email], function (err, rows) {
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
    connection.query("SELECT * FROM user WHERE username = ? ", [req.body.username], function (err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length != 0) {
            return console.log("Toks vartotojo vardas jau yra.");
        }
        if (req.body.password1 != req.body.password2) {
            return console.log("Slaptazodziai neatitinka.");
        } else {
            const today = new Date();
            connection.query("INSERT INTO user (email, password, username, created) values (?, ?, ?, ?)", [req.body.email, req.body.password1, req.body.username, today],
            function (err, rows) {
                return console.log("Vartotojas sukurtas.");
            })
        }
    });
});



module.exports = router;