const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/wide-net'

mongoose.connect( MONGODB_URI )
const db = mongoose.connection

db.once('open',()=>{
    console.log(`mongo connected @ ${db.host}:${db.port}`)
})

db.on('error',(error)=>{
    console.log(`data center en fuego`)
})

module.exports.User = require('./user')