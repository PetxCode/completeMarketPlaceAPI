const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const verify = require("../utils/authorize");
const { image } = require("../utils/multer");
const ratingModel = require("../model/ratingModel");
const commentModel = require("../model/commentModel");
const contentModel = require("../model/contentModel");
const userModel = require("../model/userModel");

// const userData = await userModel.findById(req.params.id);

router.patch(
	"/:id/viewContent/:contentID/comment/:ratingID",
	verify,
	async (req, res) => {
		try {
			const { message } = req.body;
			const getContent = await commentModel.findByIdAndUpdate(
				req.params.ratingID,
				{ message },
				{ new: true }
			);

			res.status(201).json({
				status: "content created",
				data: getContent,
			});
		} catch (err) {
			res.status(404).json({
				message: err.message,
			});
		}
	}
);

router.post(`/:id/viewContent/:contentID/comment`, verify, async (req, res) => {
	try {
		const userData = await userModel.findById(req.params.id);

		const { message } = req.body;
		const contentData = await contentModel.findById(req.params.contentID);
		const commentData = new commentModel({ message });

		commentData.content = contentData;
		commentData.save();

		contentData.comment.push(commentData);
		contentData.save();

		res.status(201).json({
			message: "rated",
			data: commentData,
		});
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
});

router.get("/:id/viewContent/:contentID/comment", verify, async (req, res) => {
	try {
		const getContent = await contentModel
			.findById(req.params.contentID)
			.populate("comment");

		res.status(201).json({
			status: "content created",
			data: getContent,
		});
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
});

module.exports = router;
