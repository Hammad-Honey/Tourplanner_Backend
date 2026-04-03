const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        required: true,
        minlength: 8,
        default:"customer"
    },
    location: {
        coordinates: {
            lng: { type: Number, default: null },
            lat: { type: Number, default: null }

        }
    }


})
module.exports = model('Users', userSchema)