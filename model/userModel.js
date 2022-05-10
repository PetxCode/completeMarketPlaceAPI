const mongoose = require("mongoose");
const userModel = mongoose.Schema(
	{
		count: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
		avatar: {
			type: String,
		},
		avatarID: {
			type: String,
		},
		seller: {
			type: Boolean,
		},
		content: [{ type: mongoose.Schema.Types.ObjectId, ref: "contents" }],

		rating: [{ type: mongoose.Schema.Types.ObjectId, ref: "ratings" }],
	},

	{ timestamps: true }
);

module.exports = mongoose.model("users", userModel);
