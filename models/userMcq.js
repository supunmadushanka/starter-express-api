const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserMcq = new schema({
  userId: {
    type: String,
    require: true,
  },
  answeredMcq: {
    type: [String],
    default : []
  },

});
module.exports = mongoose.model("UserMcq", UserMcq);
