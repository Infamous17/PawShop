const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');

const router = express.Router();

router.route("/signup").post(registerUser);
router.post("/signin", authUser);

module.exports = router;