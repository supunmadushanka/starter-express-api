const mongoose = require('mongoose');

const AnnouncementSchema = mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true  },
  email: { type: String, required: true },
   
});

module.exports = mongoose.model('userimage', AnnouncementSchema, 'userImages');