const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  
    date: {type: Date,  required: true },
    createdAt: { type: Date, expires: 'date', default: Date.now }
    
});

module.exports = mongoose.model('Profile', profileSchema);
