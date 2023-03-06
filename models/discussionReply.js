const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DiscussionReplySchema = new Schema ({
    
    name: String,
    reply: String,
    dateofregister : String,
    dateofreply : String,
    role : String,
    imagePath : String

})

module.exports = mongoose.model('discussionReply', DiscussionReplySchema, 'discussionReply')