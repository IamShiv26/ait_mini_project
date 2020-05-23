const express = require('express');
const session = require('express-session');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const router = express.Router();
const User = mongoose.model('user');
router.use(express.urlencoded({extended:false}))

var sess;

router.post('/login', async(req, res) => {
    sess = req.session;
    const email = req.body.email, password = req.body.pass;
    console.log(email, password);
    try {
        var user = await User.findOne({ email: req.body.email }).exec();
        if(!user) {
            console.log( "The email does not exist" );
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
            console.log("The password is invalid");
        }
        //console.log(user._id);
        sess.email = user.email;
        sess.userid = user._id;
        res.cookie('email',email);
        res.end('done');
    } catch (error) {
        console.log(error);
    }
    // if(email === 'root@xyz.com' && password === 'password') {
    //     res.cookie('email', email).json({success: true, email: email});
    // } else {
    //     res.json({success: false, message: 'no user found'});
    // }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/index');
    });
});

module.exports = router;