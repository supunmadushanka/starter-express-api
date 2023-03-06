const mongoose = require('mongoose')

module.exports =mongoose.model('grade06paper',{
    name:String,
    paperPath:String,
   

    subjectname:String,
    lessonname:String,
    

})
