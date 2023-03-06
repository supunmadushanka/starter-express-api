const mongoose = require('mongoose');

const PastpaperSchema = mongoose.Schema({
 
  name:  {type: [{
    type: String,
    enum: ['1 term', '2 term', '3 term']

}],},
  paperPath: { type: String, required: true },
  lessonname:  {type: [{
    type: String,
    enum: ['Maths', 'English', 'Sinhala','History','IT','Science','Budhidhism']

}],},
grade:  {type: [{
type: String,
enum: ['Grade 06', 'Grade 07', 'Grade 08','Grade 09','Grade 10','Grade 11']


}],},

created_at: {
  type: Date,
  default:  Date()
  
}
});

module.exports = mongoose.model('Pastpaper', PastpaperSchema,'pastpapers');
