const express = require("express");
const cors = require("cors");
require("dotenv").config();
const streamerControllers = require("./controllers/streamerControllers");
const logger = require("./middleware/logger");
const authenticateJWT = require("./middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 5000;

app.use(
	cors({
		origin: process.env.ORIGIN,
		credentials: true,
	})
);

app.use(express.json());

app.use((req, res, next) => {
	logger.info(`${req.method} request for ${req.url}`);
	next();
});

app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send("Something broke on server!");
});

app.post("/user/login", userControllers.login);

app.post("/streamers", streamerControllers.login);

app.get("/streamers", streamerControllers.getAllStreamers);

app.get("/streamer/:id", streamerControllers.getStreamerById);

app.put("/streamer/:id", streamerControllers.updateStreamer);

app.put(
	"/streamer/:id/vote",
	authenticateJWT,
	streamerControllers.voteStreamer
);

app.listen(port, () => {
	logger.info(`Server is running at http://localhost:${port}`);
});
