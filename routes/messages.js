const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { getMessages, postMessage } = require("../controller/messages");



router.post("/",protect(), authorize("doctor", "admin","patient"), postMessage);
router.get("/:conversationId",protect(), authorize("doctor", "admin","patient"), getMessages);





module.exports = router;
