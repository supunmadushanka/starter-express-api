const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema ({
  subjectname:String,
  name: String,
  des: String,
  videoPath: String,
  insertgrade:String,
  created_at: {
    type: Date,
    default:  Date()
    
  }
})
module.exports = mongoose.model('Upload', uploadSchema,'uploads');


