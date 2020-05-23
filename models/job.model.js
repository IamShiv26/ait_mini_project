const mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
    job_title:{ 
        type: String,
        required: 'This field is required'
    },
    description:{
        type:String,
    },
    location: {
        type: String
    },
    date_of_joining: {
        type: String
    },
    vacancy: { 
        type: Number
    },
    salary:{
        type:Number
    },
    job_nature:
        {
            type:String
        }
});

mongoose.model('job',jobSchema);