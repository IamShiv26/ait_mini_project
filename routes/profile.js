const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult } = require('express-validator');
router.use(express.urlencoded({extended:false}))
const assert = require('assert');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = mongoose.model('user');
const multer = require('multer');
const fs = require('fs');
var sess;

router.get('/',async(req,res) => {
    sess = req.session;
    console.log(sess.email);
    if(sess.email) {
        try{
            var user_profile = await User.findById(sess.userid).exec();
            //console.log(user_profile);
            res.render('profile',{user_details:user_profile});  
        }
        catch(error){
            console.log(error);
        } 
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});

router.post('/',(req,res) =>{
    sess = req.session
    //console.log(req.file);
    User.findOneAndUpdate({ _id: sess.userid }, req.body , {new : true}, (err,doc) => {
        if(!err){
            let details = {
                username: doc.username,
                fullname: doc.fullname,
                email: doc.email,
                phone:doc.phone,
                profession: doc.profession,
                appliedJobs:doc.appliedJobs
                //profileImage: doc.profileImage
            }
            res.render('profile',{user_details:details});
        }
        // else{
        //     if( err.name == 'ValidationError'){
        //         handleValidationError(err,req.body);
        //             res.render('student/form',{
        //                 viewTitle: 'Update Student',
        //                 student:req.body
        //             });
        //     }
        // }
        else
            console.log(err);
    });
});

// router.post('/imgupload',upload,(req,res) => {
//     console.log(req.file);
// });

module.exports = router;