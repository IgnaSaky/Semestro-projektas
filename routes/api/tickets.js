const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
var user = require('../api/auth');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());
router.use(bodyParser.urlencoded({ extended: true }));

var multer = require('multer');
var upload1 = multer({ dest: 'uploads/' })


var cors = require('cors');
//var app = express();
router.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'Failai')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file');

// router.post('/ticketSaving',function(req, res) {

//     upload(req, res, function (err) {
//            if (err instanceof multer.MulterError) {
//                console.log("1");
//                return res.status(500).json(err)
//            } else if (err) {
// console.log(err);
//                return res.status(500).json(err)
//            }
//       return res.status(200).send(req.file)

//     })

// });

router.post('/ticketSaving', function(req, res) {
    //console.log(cpUpload.);
    //const { title, description, price, whenPosted, file } = req.body;
    let errors = [];
    if (!req.body.title || !req.body.description || !req.body.price || !req.body.whenPosted || !req.body.file) {
        errors.push('Please enter all fields');
    }

    //Math.floor(Math.random() * (+50 - +0)) + +0; 
    const today = new Date();
    console.log(req.body);
    console.log(req.title);
    console.log(req.body.title);
    const newTicket = {
        fk_usersid: user.session.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        posted: today,
        sold: false,
        filePath: req.body.file
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