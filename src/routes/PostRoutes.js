const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");
const PostModel = require("../model/PostModel");


router.post("/post",PostController.createpost);
router.put("/post/:tweet",PostController.likedByuser);
router.post("/comment",PostController.createComment);
router.get("/comment",PostController.getComment);
router.get("/post",PostController.getPostByDate);

module.exports = router;