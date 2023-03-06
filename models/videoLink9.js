const mongoose = require('mongoose')

module.exports =mongoose.model('uploadLink9',{
    videoPath:String,
    videoname:String,
    des:String,
    subjectname:String

})
