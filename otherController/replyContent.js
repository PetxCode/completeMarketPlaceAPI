const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const verify = require("../utils/authorize");
const { image } = require("../utils/multer");
const ratingModel = require("../model/ratingModel");
const commentModel = require("../model/commentModel");
const replyModel = require("../model/replyModel");
const contentModel = require("../model/contentModel");
const userModel = require("../model/userModel");

// const userData = await userModel.findById(req.params.id);

router.get(
	"/:id/viewContent/:contentID/comment/:commentID/reply/:replyID",
	verify,
	async (req, res) => {
		try {
			const { message } = req.body;
			const getContent = await replyModel.findById(req.params.replyID);

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

router.patch(
	"/:id/viewContent/:contentID/comment/:commentID/reply/:replyID",
	verify,
	async (req, res) => {
		try {
			const { message } = req.body;
			const getContent = await replyModel.findByIdAndUpdate(
				req.params.replyID,
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

router.delete(
	"/:id/viewContent/:contentID/comment/:commentID/reply/:replyID",
	verify,
	async (req, res) => {
		try {
			const { message } = req.body;
			const commentData = await commentModel.findById(req.params.commentID);
			const getContent = await replyModel.findByIdAndRemove(req.params.replyID);

			commentData.reply.pull(getContent);
			commentData.save();

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

router.post(
	`/:id/viewContent/:contentID/comment/:commentID/reply`,
	verify,
	async (req, res) => {
		try {
			const userData = await userModel.findById(req.params.id);

			const { message } = req.body;
			const commentData = await commentModel.findById(req.params.commentID);
			const replyData = new replyModel({ message });

			replyData.comment = commentData;
			replyData.save();

			commentData.reply.push(replyData);
			commentData.save();

			res.status(201).json({
				message: "rated",
				data: replyData,
			});
		} catch (err) {
			res.status(404).json({
				message: err.message,
			});
		}
	}
);

router.get(
	"/:id/viewContent/:contentID/comment/:commentID/reply",
	verify,
	async (req, res) => {
		try {
			const getContent = await commentModel
				.findById(req.params.commentID)
				.populate("reply");

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

module.exports = router;
