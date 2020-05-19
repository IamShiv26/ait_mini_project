const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/login', (req, res) => {
    const email = req.body.email, password = req.body.password;
    console.log(email, password);
    if(email === 'root@xyz.com' && password === 'password') {
        res.cookie('email', email).json({success: true, email: email});
    } else {
        res.json({success: false, message: 'no user found'});
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie("email").redirect('/index');
});

module.exports = router;