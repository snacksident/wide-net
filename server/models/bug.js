const mongoose = require('mongoose')

const BugSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    priority: {
        type: String,
        default: 'Normal',
    },
    status: {
        type: String,
        default: 'Open'
    },
    notes: {
        type: String,
        require: false
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
},{timestamps: true})

module.exports = mongoose.model('Bug',BugSchema)