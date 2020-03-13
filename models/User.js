const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Your Name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email']
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"]
    },
    favRecipes : {
        type: [{}]
    },
    createdAt: {
        type: Date,
        defualt: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema)