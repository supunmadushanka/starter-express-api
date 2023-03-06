const mongoose = require('mongoose');

const AnnouncementSchema = mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  
    des:{ type: String, required: true },
    createdAt: { type: Date, expires: 'date', default: Date.now }
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);