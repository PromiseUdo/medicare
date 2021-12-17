
const Message = require("../models/Message");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncMiddleware");

// desc     get all messages
//route     get /api/v1/message/:conversationId
//access    private

exports.getMessages = asyncHandler(async (req, res, next) => {
    const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
     
       
        res.status(200).json({ success: true, data: messages });
});



// desc     post message
//route     post /api/v1/message
//access    private
exports.postMessage = asyncHandler(async (req, res, next) => {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
  res.status(201).json({ success: true, data: savedMessage });
});



