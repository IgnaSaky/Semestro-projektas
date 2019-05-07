const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
var user = require('../api/auth');
router.post('/ticketSaving', (req, res) => {
    const { title, description, price, whenPosted, file } = req.body;
    let errors = [];
    if (!title || !description || !price || !whenPosted || !file) {
        errors.push('Please enter all fields');
    }
    //Math.floor(Math.random() * (+50 - +0)) + +0; 
    const today = new Date();
    const newTicket = {
        fk_usersid: user.session.id,
        title,
        description,
        price,
        posted: today,
        sold: false,
        filePath: file,
    }
    console.log(newTicket);
    const insertQuery = 'INSERT INTO tickets SET ?';
    db.query(insertQuery, newTicket, (err) => {
        //const success = [];
        if (err) {
            console.log(err.message);
            errors.push('Ivyko klaida. Pabandykite dar karta');

            return res.status(400).json(errors);
        } else {

            //res.redirect('/login')
            return res.status(200).json({ success: true, errors: errors });
        }
    });
});
module.exports = router;