const mongoose = require("mongoose");
const contentModel = mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
		},
		category: {
			type: String,
		},
		image: {
			type: String,
		},
		imageID: {
			type: String,
		},

		rating: [{ type: mongoose.Schema.Types.ObjectId, ref: "ratings" }],

		comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],

		user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},

	{ timestamps: true }
);

module.exports = mongoose.model("contents", contentModel);
