const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult } = require('express-validator');
router.use(express.urlencoded({extended:false}))
const assert = require('assert');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Job = mongoose.model('job');
const User = mongoose.model('user');
const multer = require('multer');
const fs = require('fs');
var sess;

router.get('/',async(req,res) => {
    var jobs = await Job.find().exec();
    sess = req.session;
    var appliedJobs;
    if(sess.email) {
    var user_profile = await User.findById(sess.userid).exec();
    appliedJobs = user_profile.appliedJobs;
    }
    // console.log(appliedJobs);
    console.log(req.cookies.email);
    res.render('jobs',{jobs:jobs,appliedJobs:appliedJobs,cookie:req.cookies.email});
});

module.exports = router;