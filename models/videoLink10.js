const mongoose = require('mongoose')

module.exports =mongoose.model('uploadLink10',{
    videoPath:String,
    videoname:String,
    des:String,
    subjectname:String

})
