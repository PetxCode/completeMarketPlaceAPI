const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const verify = require("../utils/authorize");
const { image } = require("../utils/multer");
const userModel = require("../model/userModel");
const contentModel = require("../model/contentModel");

router.post("/:id/createContent", verify, image, async (req, res) => {
	try {
		if (req.user.seller === true) {
			const { description, title, price, category } = req.body;
			const cloudImage = await cloudinary.uploader.upload(req.file.path);
			const getUser = await userModel.findById(req.params.id);
			const getContent = new contentModel({
				description,
				title,
				price,
				category,
				image: cloudImage.secure_url,
				imageID: cloudImage.public_id,
			});

			getContent.user = getUser;
			getContent.save();

			getUser.content.push(getContent);
			getUser.save();

			res.status(201).json({
				status: "content created",
				data: getContent,
			});
		} else {
			res.status(404).json({
				message: "You can't carry out this Operation",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
});

router.get("/:id/viewContent", async (req, res) => {
	try {
		const getUser = await userModel.findById(req.params.id).populate("content");

		res.status(201).json({
			status: "view contents",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
});

router.get("/:id/viewContent/:contentID", async (req, res) => {
	try {
		const getUser = await contentModel
			.findById(req.params.contentID)
			.populate("user");

		res.status(201).json({
			status: "view contents",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
});

router.delete("/:id/viewContent/:contentID", verify, async (req, res) => {
	try {
		if (req.user.seller === true) {
			const getUser = await userModel.findById(req.params.id);

			const deleteData = await contentModel.findByIdAndDelete(
				req.params.contentID
			);

			getUser.content.pull(deleteData);
			getUser.save();

			res.status(201).json({
				status: "content deleted",
				data: getUser,
			});
		} else {
			res.status(404).json({
				message: "Sorry you can do this!",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
});

router.patch(
	"/:id/viewContent/:contentID/updateContent",
	verify,
	image,
	async (req, res) => {
		try {
			if (req.user.seller === true) {
				const check = await contentModel.findById(req.params.contentID);

				if (check) {
					const { description, title, price, category } = req.body;
					await cloudinary.uploader.destroy(check.imageID);
					const cloudImage = await cloudinary.uploader.upload(req.file.path);

					const getUser = await contentModel.findByIdAndUpdate(
						req.params.contentID,
						{
							description,
							title,
							price,
							category,
							image: cloudImage.secure_url,
							imageID: cloudImage.public_id,
						},
						{ new: true }
					);

					res.status(201).json({
						status: "view contents",
						data: getUser,
					});
				}
			} else {
				res.status(404).json({
					message: "Sorry you can do this!",
				});
			}
		} catch (err) {
			res.status(404).json({
				message: err.message,
			});
		}
	}
);

module.exports = router;
