const mongoose = require('mongoose')

const Schema = mongoose.Schema

const teacherSchema = new Schema ({
    // _id: String,
    name: String,
    Subject: String,
    email : String,
    Telephone : String,
    description: String,
    area: String,
    grade : String,
    imagePath : String

})

module.exports = mongoose.model('teacher', teacherSchema , 'teachers')