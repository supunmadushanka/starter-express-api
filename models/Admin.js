
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;
const AdminSchema = mongoose.Schema({
    title:String,
    firstName:String,
    lastName:String,
    NicNumber:String,
    Mobile:Number,
    email: String,
    password: String,
   

})

AdminSchema.pre("save",async function(next){
    const user=this;
    if(user.isModified("password")){
      user.password=await bcrypt.hash(user.password,10);
    }
    next()
  })
  
 

module.exports = mongoose.model('Admin', AdminSchema)