const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { getConversation,getConversations, postConversation } = require("../controller/conversations");



router.post("/:receiverId",protect(), authorize("doctor", "admin","patient"), postConversation);
router.get("/:receiverId",protect(), authorize("doctor", "admin","patient"), getConversation);
router.get("/",protect(), authorize("doctor", "admin","patient"), getConversations);




module.exports = router;
