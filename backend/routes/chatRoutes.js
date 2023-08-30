const express = require('express');
const protect = require("../middleware/authMiddleware");
const { accessChat, fetchChats } = require('../controllers/chatControllers');

const router = express.Router();

router.route("/adopt").post(protect, accessChat);
router.route("/favorites").post(protect, accessChat);
router.route("/chat").get(protect, fetchChats);

module.exports = router;
