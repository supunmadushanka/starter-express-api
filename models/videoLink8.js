const mongoose = require('mongoose')

module.exports =mongoose.model('uploadLink8',{
    videoPath:String,
    videoname:String,
    des:String,
    subjectname:String

})
