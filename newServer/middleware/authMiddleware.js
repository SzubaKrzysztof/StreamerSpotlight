const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

function authenticateJWT(req, res, next) {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];

		jwt.verify(token, secretKey, (err, user) => {
			if (err) {
				console.error("Error during JWT verification", err);
				return res.sendStatus(403);
			}
			req.user = user;
			console.log("User set in req:", req.user);
			next();
		});
	} else {
		console.log("No authorization header");
		res.sendStatus(401);
	}
}

module.exports = authenticateJWT;
