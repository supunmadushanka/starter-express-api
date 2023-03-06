const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    name : String,
    email: String,
    password: String,
    dateOfExam : Date,
    NICNumber : String,
    role : String,
    grade : String,
    level : {
        type : Number,
        default : 0
    },
    marks : {
        type : Number,
        default : 0
    },
    phone : String,
    school : String,
    access : Boolean,
    dateofregister : String,
    imagePath : {
        type : String, 
        default: "http://localhost:3000/images/1.png"
    }
})

module.exports = mongoose.model('user', userSchema , 'users')