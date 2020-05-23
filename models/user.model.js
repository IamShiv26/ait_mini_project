const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username:{ 
        type: String,
        required: 'This field is required'
    },
    fullname:{
        type:String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: { 
        type: String
    },
    profession:{
        type:String
    },
    appliedJobs: [
        {
            title: String,
            cv_name: String,
            coverletter: String,
            portfolio_link: String
        }
    ]
});


//Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},'Invalid Email');

mongoose.model('user',userSchema);