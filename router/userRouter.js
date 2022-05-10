const express = require("express");
const {
	getUsers,
	getUser,
	deleteUser,
	signInUser,
} = require("../controller/userController");
const router = express.Router();

router.route("/").get(getUsers);
router.route("/signin").post(signInUser);
router.route("/:id").get(getUser).delete(deleteUser);

module.exports = router;
