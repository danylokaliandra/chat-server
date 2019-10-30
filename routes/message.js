var express = require('express');

// https://stackoverflow.com/questions/28977253/express-router-undefined-params-with-router-use-when-split-across-files
var router = express.Router({mergeParams: true});

var Message = require("../models/message");
var winston = require('../config/winston');
var MessageConstants = require("../models/messageConstants");
var messageEvent = require("../events/messageEvent");

var Conversation = require("../models/conversation");


router.post('/', function(req, res) {

 var newMessage = new Message({
    sender_id: req.body.sender_id,
    sender_fullname: req.body.sender_fullname,
    recipient_id: req.body.recipient_id,
    recipient_fullname: req.body.recipient_fullname,
    text: req.body.text,
    app_id: req.body.app_id,
    createdBy: req.body.sender_id,
  });

  newMessage.save(function(err, savedMessage) {
    if (err) {
      console.log(err);
      return res.status(500).send({success: false, msg: 'Error saving object.', err:err});
    }


    messageEvent.emit("message.create",savedMessage);
    res.json(savedMessage);
  });





  
});





router.get('/', function(req, res) {

    Message.find({"recipient": req.params.request_id, id_project: req.projectid}).sort({updatedAt: 'asc'}).exec(function(err, messages) { 
      if (err) {
return next(err);
      }
      res.json(messages);

    });

});


module.exports = router;
