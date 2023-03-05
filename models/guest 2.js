const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    pronoun: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest