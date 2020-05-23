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
var url = require('url');
var sess;
var id;
const storage = multer.diskStorage({
    destination : 'uploads/',
    filename : function(req,file,callback){
        // console.log(file);
        callback(null,file.fieldname + '-'+Date.now()+ path.extname(file.originalname));
    }
});

const upload = multer({
    storage : storage,
    // limits:{fileSize:100}
    fileFilter:function(req,file,callback){
        checkFileType(file,callback);
    }
}).single('resume_upload');

function checkFileType(file,callback){

    //Allowed exts
    const filetypes = /doc|docx|pdf/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype)
    {
        return callback(null,true);
    }
    else{
        return callback("Error : Wrong File Format");
    }

}

router.get('/',async(req,res) => {
    sess = req.session;
    console.log(sess.email);
    var fullUrl = req.protocol + '://' + req.get('host') + req.url;
    var q = url.parse(fullUrl, true);
    id = q.query.id;
    var job_profile = await Job.findById(id).exec();
    var user_profile = await User.findById(sess.userid).exec();
    res.render('job_details',{job_profile:job_profile, user_profile:user_profile});
});

router.post('/upload' ,async(req,res) => {
    sess = req.session;
    console.log(id);
    var job_profile = await Job.findById(id).exec();
    upload(req,res,(err)=>{
        // console.log(req.file.filename);
        if(err){
            console.log("Erroroorororo");
            res.render('job_details'+"?id="+id,{msg:err});
        }
        else{
            if(req.file == undefined)
            {
                res.render('index',{msg:"No file selected!!"});
            }
            else{
                User.findOneAndUpdate({ _id: sess.userid }, {appliedJobs:{title : job_profile.job_title, cv_name : req.file.filename, coverletter : req.body.coverletter, portfolio_link : req.body.portfolio_link} }, {new : true}, (err,doc) => {
                    if(err){
                        alert('Wrong Details!!!!');
                        }
                });
                res.redirect('/jobs');
            }
        }
    });
});

module.exports = router;