const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DiscussionSchema = new Schema ({
    // _id: String,
    name: String,
    comment: String,
    dateofregister : String,
    dateofcomment : String,
    role : String,
    imagePath : String,
    discussionReply : [{}]


})

module.exports = mongoose.model('discussion', DiscussionSchema , 'discussions')