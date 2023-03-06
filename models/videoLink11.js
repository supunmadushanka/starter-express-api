const mongoose = require('mongoose')

module.exports =mongoose.model('uploadLink11',{
    videoPath:String,
    videoname:String,
    des:String,
    subjectname:String

})
