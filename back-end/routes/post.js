const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", auth, multer, postCtrl.create);
router.get("/", postCtrl.getAllPosts);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.updateOnePost);
router.get("/:id", postCtrl.getOnePost);

router.post("/posts/:id/likes", likeCtrl.likePost);

module.exports = router;