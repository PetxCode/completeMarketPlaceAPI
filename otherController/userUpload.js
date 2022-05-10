const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const { upload } = require("../utils/multer");

router.post("/register", upload, async (req, res) => {
	try {
		const { email, password, userName } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const image = await cloudinary.uploader.upload(req.file.path);

		const createUser = await userModel.create({
			email,
			password: hashed,
			userName,
			avatar: image.secure_url,
			avatarID: image.public_id,
			seller: false,
		});

		res.status(201).json({
			message: "member created ",
			data: createUser,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

router.post("/register_join", upload, async (req, res) => {
	try {
		const { email, password, userName } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const image = await cloudinary.uploader.upload(req.file.path);

		const createUser = await userModel.create({
			email,
			password: hashed,
			userName,
			avatar: image.secure_url,
			avatarID: image.public_id,
			seller: true,
		});

		res.status(201).json({
			message: "seller created ",
			data: createUser,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

router.patch("/:id/update", upload, async (req, res) => {
	try {
		const { userName } = req.body;
		const image = await cloudinary.uploader.upload(req.file.path);
		const createUser = await userModel.findByIdAndUpdate(
			req.params.id,
			{
				userName,
				avatar: image.secure_url,
				avatarID: image.public_id,
			},
			{ new: true }
		);

		res.status(201).json({
			message: "updated created ",
			data: createUser,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

module.exports = router;
