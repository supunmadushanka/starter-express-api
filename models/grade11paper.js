const mongoose = require('mongoose')

module.exports =mongoose.model('grade11paper',{
    name:String,
    paperPath:String,
   
    subjectname:String

})
