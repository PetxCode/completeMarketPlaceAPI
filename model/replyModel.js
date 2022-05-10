const mongoose = require("mongoose");
const replyModel = mongoose.Schema(
	{
		message: {
			type: String,
		},
		comment: { type: mongoose.Schema.Types.ObjectId, ref: "comments" },
		content: { type: mongoose.Schema.Types.ObjectId, ref: "contents" },
	},

	{ timestamps: true }
);

module.exports = mongoose.model("replys", replyModel);
