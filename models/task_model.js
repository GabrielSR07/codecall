
const mongoose = require('mongoose'); //probando ()

var TaskSchema = mongoose.Schema;


module.exports = mongoose.model('Task', TaskSchema({
    content: String,
    timestamp: String,
    creator: {
     type:String,
     required: true
    }
  })
)