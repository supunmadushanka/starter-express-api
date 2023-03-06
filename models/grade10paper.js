const mongoose = require('mongoose')

module.exports =mongoose.model('grade10paper',{
    name:String,
    paperPath:String,
   
    subjectname:String

})
