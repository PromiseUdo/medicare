
const Conversation = require("../models/Conversation");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncMiddleware");

// desc     get all conversations of a user
//route     get /api/v1/conversation
//access    private

exports.getConversations = asyncHandler(async (req, res, next) => {
        const conversation = await Conversation.find({
          members: { $in: [req.user.id] },
        });
        if (!conversation) {
            return next(new ErrorResponse("No such conversations found", 401));
          }
        res.status(200).json({ success: true, data: conversation });
});



// desc     post conversation
//route     post /api/v1/conversation/:receiverId
//access    private
exports.postConversation = asyncHandler(async (req, res, next) => {
  
  const newConversation = new Conversation({
    members: [req.user.id, req.params.receiverId],
  });
    const savedConversation = await newConversation.save();
    if (!savedConversation) {
        return next(new ErrorResponse("Error posting conversation", 401));
      }

  res.status(201).json({ success: true, data: savedConversation });
});

// desc     get a conversation
//route     get /api/v1/conversation/:receiverId
//access    private
exports.getConversation = asyncHandler(async (req, res, next) => {

    const conversation = await Conversation.findOne({
      members: { $all: [req.user.id, req.params.receiverId] },
    });
    if (!conversation) {
        return next(new ErrorResponse("No such conversation found", 401));
      }
  res.status(201).json({ success: true, data: conversation });
});



