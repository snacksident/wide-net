const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    admin: {
        type: Boolean,
        default: false
    },
    team: {
        type: String,
        default: null
    },
    bugs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bugs',
        required: false
    }
})

module.exports = mongoose.model('User',UserSchema)