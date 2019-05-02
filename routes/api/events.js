const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);


router.get('/', (req, res) => {
    connection.query("SELECT * FROM spectacle", function (err, rows) {
        if (err) {
            throw err;
        }
        
        res.send(rows);
    });
});
router.get('/genre/:genreid', (req, res) => {
    connection.query("SELECT * FROM spectacle WHERE category = ?",req.params.genreid, function (err, rows) {
        if (err) {
            console.log("SELECT * FROM spectacle WHERE category=" + req.params.genreid);
            throw err;
        }
        
        res.send(rows);
    });
});

module.exports = router;