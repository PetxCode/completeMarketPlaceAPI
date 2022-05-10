const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signInUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const findUser = await userModel.findOne({ email });
		if (findUser) {
			const passCheck = await bcrypt.compare(password, findUser.password);
			if (passCheck) {
				const token = jwt.sign(
					{
						_id: findUser._id,
						email: findUser.email,
						userName: findUser.userName,
						seller: findUser.seller,
						avatar: findUser.avatar,
					},
					"AjeGUNLESEllerMarketPLACE",
					{ expiresIn: "1d" }
				);
				const { password, ...info } = findUser._doc;

				res.status(201).json({
					status: `Welcome back ${findUser.userName} `,
					data: { token, ...info },
				});
			} else {
				res.status(500).json({
					status: "password is incorrect",
				});
			}
		} else {
			res.status(500).json({
				status: "user not in our database",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: err.message,
		});
	}
};

const getUsers = async (req, res) => {
	try {
		const user = await userModel.find();
		res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (err) {
		res.status(500).json({
			status: err.message,
		});
	}
};

const getUser = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (err) {
		res.status(500).json({
			status: err.message,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		await userModel.findByIdAndDelete(req.params.id);
		res.status(200).json({
			status: "successfully delete",
		});
	} catch (err) {
		res.status(500).json({
			status: err.message,
		});
	}
};

module.exports = {
	signInUser,
	getUsers,
	getUser,
	deleteUser,
};
