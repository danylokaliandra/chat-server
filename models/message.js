var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  sender_id: {
    type: String,
    required: true
  },
  sender_fullname: {
    type: String,
    required: false
  },
  recipient_id: {
    type: String,
    required: true
  },
  recipient_fullname: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: true
  },
  app_id: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    required: true,
    index: true
  },

  attributes: {
    type: Object,
  },
  metadata: {
    type: Object,
  },
  createdBy: {
    type: String,
    required: true
  }
},{
  timestamps: true
}
);

module.exports = mongoose.model('message', MessageSchema);