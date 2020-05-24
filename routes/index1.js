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
    // sess = req.session;
    // var user_profile = await User.findById(sess.userid).exec();
    // var appliedJobs = user_profile.appliedJobs;
    // console.log(appliedJobs);
    // console.log(jobs)
    // res.cookie("email","");
    res.render('index',{jobs:jobs});
});
router.get('/index',async(req,res) => {
    var jobs = await Job.find().exec();
    // sess = req.session;
    // var user_profile = await User.findById(sess.userid).exec();
    // var appliedJobs = user_profile.appliedJobs;
    // console.log(appliedJobs);
    // console.log(jobs)
    res.render('index',{jobs:jobs});
});

module.exports = router;