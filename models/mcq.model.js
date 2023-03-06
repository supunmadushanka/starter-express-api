const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MCQ = new schema({
  name: {
    type: String,
    require: true,
  },
  grade : {
    type : String
  },
  mcqType : {
    type : String,
    required : true
  },
  addedTeacherName : {
    type : String
  },
  reported : {
    type : Boolean,
    default : false
  },
  name1: {
    type: String,
    require: true,
  },
  answer1:{
    type: String,
    require : true
  },
  answer2:{
    type: String,
    require : true
  },
  answer3:{
    type: String,
    require : true
  },

});
module.exports = mongoose.model("MCQ", MCQ);

