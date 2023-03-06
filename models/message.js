const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = Schema ({
    name : String,
    topic : String,
    email : String,
    message : String
})

module.exports = mongoose.model('message', messageSchema , 'messages')