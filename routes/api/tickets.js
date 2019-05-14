const express = require('express');
const mysql = require('mysql');
const router = express.Router({ mergeParams: true });
const dbconfig = require('../../config/database');
const db = mysql.createConnection(dbconfig.connection);
var user = require('../api/auth');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload1 = multer({ dest: 'uploads/' })
var filename;

var cors = require('cors');
router.use(cors())

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
    
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        } else {
            
        if (!req.body.title || !req.body.description || !req.body.price ) {
            errors.push('Please enter all fields');
        }
        const today = new Date();
        const newTicket = {
            fk_usersid: user.session.id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            posted: today,
            sold: false,
            filePath: filename,
        }
        console.log(newTicket);
        const insertQuery = 'INSERT INTO tickets SET ?';
        db.query(insertQuery, newTicket, (err) => {
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
    //        if (err instanceof multer.MulterError) {
    //            return res.status(500).json(err)
    //        } else if (err) {
    //            return res.status(500).json(err)
    //        }
    //   return res.status(200).send(req.file)
        }
    })
});


// router.post('/ticketSaving',  function(req, res) {
//     //console.log(cpUpload.);
//     //const { title, description, price, whenPosted, file } = req.body;
//     let errors = [];
    
//     if (!req.body.title || !req.body.description || !req.body.price || !req.body.whenPosted || !req.body.file) {
//         errors.push('Please enter all fields');
//     }

//     const today = new Date();
//     console.log(req.get('title'));
//     console.log(req.file);
//     console.log(req.body);
//     const newTicket = {
//         fk_usersid: user.session.id,
//         title: req.body.title,
//         description: req.body.description,
//         price: req.body.price,
//         posted: today,
//         sold: false,
//         filePath: req.body.file
//     }
//     console.log(newTicket);
//     const insertQuery = 'INSERT INTO tickets SET ?';
//     db.query(insertQuery, newTicket, (err) => {
//         //const success = [];
//         if (err) {
//             console.log(err.message);
//             errors.push('Ivyko klaida. Pabandykite dar karta');

//             return res.status(400).json(errors);
//         } else {

//             //res.redirect('/login')
//             return res.status(200).json({ success: true, errors: errors });
//         }
//     });
// });
module.exports = router;