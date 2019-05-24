const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

router.get('/', (req, res) => {
    connection.query("SELECT title, id_spectacle FROM spectacle", function (err, rows){
        if(err){
            throw err;
        }
        res.send(rows);
    });
});
module.exports=router;