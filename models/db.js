const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ait_project:monujaiswa@cluster0-k7l6v.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true}, (err) => {
    if(!err) {console.log('MongoDB connection succesfull')}
});

require('./user.model');