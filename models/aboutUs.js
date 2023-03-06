const mongoose = require('mongoose');

const AboutSchema = mongoose.Schema({
  title:{type:String},
  body: { type: String},
  documentPath: { type: String},
});
module.exports = mongoose.model('Document', AboutSchema,'documents');