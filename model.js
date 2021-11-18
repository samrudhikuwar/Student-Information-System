const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    userType: {
        type: String
    }
    
})

const studentcollection = mongoose.model('student', schema);

module.exports = studentcollection;


