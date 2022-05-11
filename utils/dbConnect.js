const mongoose = require("mongoose");
const url = "mongodb://localhost/marketPlaceDB";

const uri =
	"mongodb+srv://comsol:comsol@cluster0.kjlbe.mongodb.net/marketPlace?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
	console.log("Database now connected...!");
});
