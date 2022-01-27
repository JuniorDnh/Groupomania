const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/user");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const { signupValidator, loginValidator, profileValidator } = require('../middleware/validator');

router.post("/register", signupValidator, usersCtrl.signup);
router.post("/login", loginValidator, usersCtrl.login);
router.get("/", usersCtrl.getAllUsers);

router.put("/userInfo", auth, multer, profileValidator, usersCtrl.changeInfo);
router.get("/userInfo/:id", usersCtrl.getOneUser);
router.delete("/userInfo/:id", auth, usersCtrl.deleteUser);

module.exports = router;