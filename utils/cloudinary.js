const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "comsolproject",
	api_key: "311895948615649",
	api_secret: "KEH__UkTOGIwATv7texEP9GIK0U",
	secure: true,
});

module.exports = cloudinary;
