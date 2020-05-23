const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult } = require('express-validator');
router.use(express.urlencoded({extended:false}))
const assert = require('assert');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Job = mongoose.model('job');
const multer = require('multer');
const fs = require('fs');
var sess;

router.get('/',async(req,res) => {
    var jobs = await Job.find().exec();
    console.log(jobs)
    res.render('jobs',{jobs:jobs});
});

module.exports = router;