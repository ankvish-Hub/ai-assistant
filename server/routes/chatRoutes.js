const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { askQuestion } = require("../controllers/chatController");

const router = express.Router();

router.post("/:fileId", protect, askQuestion);

module.exports = router;