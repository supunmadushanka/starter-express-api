const mongoose = require('mongoose')

module.exports =mongoose.model('uploadLink07',{
    videoPath:String,
    videoname:String,
    des:String,
    subjectname:String

})
