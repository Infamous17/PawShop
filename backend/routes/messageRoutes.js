const express = require("express");
const protect = require("../middleware/authMiddleware");
const { sendMessage, allMessages } = require("../controllers/messageControllers");

const router = express.Router();

router.route("/message").post(protect, sendMessage);
router.route("/message/:chatId").get(protect, allMessages);

module.exports = router;