const express = require('express');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
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

router.post('/register',[
    check('username','Cannot be empty').notEmpty(),
    check('email','Invalid Email').isEmail(),
    check('pass','Password should be minimum 5 characters').isLength({min:5}),
    check('cpass').custom((value,{req}) =>{
        console.log(value+"-"+req.body.pass);
        if (value !== req.body.pass) {
            throw new Error('Passwords do not match');
        }
    })
],(req,res) => {
    const errors = validationResult(req);
    console.log(errors.mapped());
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    var password = req.body.pass;
    let hashed_password = bcrypt.hashSync(password, 10);
    user.password = hashed_password;
    user.fullname = req.body.username;
    user.phone = '';
    user.profession = '';
    user.save((err,doc) => {
        if(!err)
            res.end('done');
        //else{
            // if(err.name == 'ValidationError'){
            //     handleValidationError(err,req.body);
            //     res.render("student/form",{
            //         viewTitle: "Insert Student",
            //         student: req.body
            //     });
            // }
            // else
            //     console.log('Error during saving records');
        //}
    });
    //res.app.set('user_details', data);
});

router.get('/logout', (req, res) => {
    // req.session.destroy((err) => {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     res.redirect('/index');
    // });
    res.clearCookie("email").redirect('/index');
});

module.exports = router;