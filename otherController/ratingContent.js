const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const verify = require("../utils/authorize");
const { image } = require("../utils/multer");
const ratingModel = require("../model/ratingModel");
const contentModel = require("../model/contentModel");
const userModel = require("../model/userModel");

// const userData = await userModel.findById(req.params.id);

router.patch(
	"/:id/viewContent/:contentID/rating/:ratingID",
	verify,
	async (req, res) => {
		try {
			const { count } = req.body;
			const getContent = await ratingModel.findByIdAndUpdate(
				req.params.ratingID,
				{ count },
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

router.post(`/:id/viewContent/:contentID/rating`, verify, async (req, res) => {
	try {
		const userData = await userModel.findById(req.params.id);

		if (userData) {
			const ratingData = await ratingModel.findByIdAndUpdate();

			res.status(200).json({
				message: "You've already rated",
			});
		} else {
			const { count } = req.body;
			const contentData = await contentModel.findById(req.params.contentID);
			const ratingData = new ratingModel({ count });

			ratingData.content = contentData;
			ratingData.save();

			contentData.rating.push(ratingData);
			contentData.save();

			res.status(201).json({
				message: "rated",
				data: { ratingData },
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
});

router.get("/:id/viewContent/:contentID/rating", verify, async (req, res) => {
	try {
		const getContent = await contentModel
			.findById(req.params.contentID)
			.populate("rating");

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
