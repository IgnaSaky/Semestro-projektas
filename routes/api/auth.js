const express = require('express');
const router = express.Router({mergeParams: true});

router.post('/login', (req,res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    res.send('login post route trigerred');
});

router.post('/register', (req, res) => {

    res.send('login post route trigerred');
});

module.exports = router;