const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    firstname: {
        type: String,
        require: true
    },

    lastname: {
        type: String,
        require: true
    },

    age: {
        type: Number,
        require: true
    },

    profilePic: {
        type: String
    },

    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);