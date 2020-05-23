const express = require('express');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const router = express.Router();
const Job = mongoose.model('job');
router.use(express.urlencoded({extended:false}))

router.post('/',(req,res) => {
    var job = new Job();
    job.job_title = req.body.job_title;
    job.description = req.body.description;
    job.location = req.body.location;
    job.date_of_joining = req.body.date_of_joining;
    job.vacancy = req.body.vacancy;
    job.salary = req.body.salary;
    job.job_nature = req.body.job_nature;
    job.save((err,doc) => {
        if(!err)
            res.json('done');
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
    //res.app.set('job_details', data);
});

module.exports = router;