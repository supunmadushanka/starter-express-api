const mongoose = require('mongoose')

module.exports =mongoose.model('uploadLink',{
    videoPath:String,
    videoname:String,
    des:String,
    subjectname :String
   

})






