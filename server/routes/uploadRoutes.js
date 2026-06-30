const express = require("express");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const {
    uploadFile
} = require("../controllers/uploadController");

const router = express.Router();

router.post(
    "/",
    protect,
    upload.single("file"),
    uploadFile
);

module.exports = router;