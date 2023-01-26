const express = require("express");
const postsController = require("../controllers/posts");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, postsController.createPost);

router.put("/:id", checkAuth, extractFile, postsController.editPost);

router.get("", postsController.getAllPosts);

router.get("/:id", postsController.getOnePost);

router.delete("/:id", checkAuth, postsController.deletePost);

module.exports = router;
