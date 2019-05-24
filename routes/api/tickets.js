const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
var user = require('../api/auth');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload1 = multer({ dest: 'uploads/' });
var filename;


var cors = require('cors');
router.use(cors())

router.get('/ticketSaving', (req, res) => {
    connection.query("SELECT title FROM categories", function (err, rows){
        if(err){
            throw err;
        }
        res.send(rows);
    });
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'Failai')
  },
  filename: function (req, file, cb) {
    const date = Date.now();
    cb(null, date + '-' +file.originalname )
    filename = 'Failai/' + date + '-' +file.originalname;
  }
})

var upload = multer({ storage: storage }).single('file');

router.post('/ticketSaving',function(req, res) {
    upload(req, res, function (err) {
        let errors = [];
        var session1;
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        } else {

        if (!req.body.title || !req.body.description || !req.body.price ) {
            errors.push('Please enter all fields');
        }
        const findBytitle = 'SELECT * FROM spectacle where title = ?';
        db.query(findBytitle,[req.body.title], (err, rows) => {
            if (rows && rows.length > 0) {
                const today = new Date();
                const newTicket = {
                    fk_usersid: user.session,
                    fk_id_spectacle: rows[0].id_spectacle,
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    posted: today,
                    sold: false,
                    filePath: filename,
                }
                const insertQuery = 'INSERT INTO tickets SET ?';
                db.query(insertQuery, newTicket, (err) => {
                    if (err) {
                        console.log(err.message);
                        errors.push('Ivyko klaida. Pabandykite dar karta');
                        console.log(err);
                        return res.status(400).json(errors);
                    } else {
                        //res.redirect('/login')
                        // return res.status(200).json({ success: true, errors: errors });
                    }
                })
                return res.json({fk_id_spectacles: rows[0]});
            }
            else {
                return res.json({message: "Klaida"});
            }
        });
        }
    })
});

router.post('/eventSaving',function(req, res) {
    upload(req, res, function (err) {
        let errors = [];
    
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        } else {

        if (!req.body.title || !req.body.description || !req.body.price ) {
            errors.push('Please enter all fields');
        }
        const newEvent = {
            title: req.body.title,
            description: req.body.eventDescription,
            adress: req.body.address,
            date: req.body.date,
            category: req.body.category
        }
        console.log(newEvent);
        const insertQuery = 'INSERT INTO spectacle SET ?';
        db.query(insertQuery, newEvent, (err) => {
            //const success = [];
            if (err) {
                console.log(err.message);
                errors.push('Ivyko klaida. Pabandykite dar karta');
                console.log(err);
                return res.status(400).json(errors);
            } else {
                //res.redirect('/login')
                return res.status(200).json({ success: true, errors: errors });
            }
        })
        }
    })
});

module.exports = router;