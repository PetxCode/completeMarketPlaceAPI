const express = require("express");
const cors = require("cors");
const port = 4444;
const app = express();
require("./utils/dbConnect");

app.use(cors());
app.use(express.json());

// app.get("/")

app.use("/api/user", require("./router/userRouter"));
app.use("/api/user", require("./otherController/userUpload"));

app.use("/api/content/", require("./otherController/contentUpload"));

app.use("/api/content/", require("./otherController/ratingContent"));

app.use("/api/content/", require("./otherController/commentContent"));
app.use("/api/content/", require("./otherController/replyContent"));

app.listen(port, () => {
	console.log("server is now connected");
});
